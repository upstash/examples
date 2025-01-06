import { Redis } from "@upstash/redis/cloudflare";

type ChatMessage = {
	userId: string;
	message: string;
	timestamp: number;
}

export class ChatRoom {
	state: DurableObjectState;
	sessions: Map<WebSocket, string>;
	env: Env;

	constructor(state: DurableObjectState, env: Env) {
		this.state = state;
		this.sessions = new Map();
		this.env = env;
	}

	async fetch(request: Request) {
		const upgradeHeader = request.headers.get("Upgrade");
		if (!upgradeHeader || upgradeHeader !== "websocket") {
			return new Response("Expected Websocket", { status: 426 });
		}

		const redis = new Redis({
			url: this.env.UPSTASH_REDIS_REST_URL,
			token: this.env.UPSTASH_REDIS_REST_TOKEN,
		});

		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);

		server.accept();

		server.addEventListener("message", async event => {
			try {
				const data = JSON.parse(event.data as string);

				if (data.type === 'init') {
					// Store the client's userId
					this.sessions.set(server, data.userId);

					// Send message history after receiving userId
					const history = await redis.zrange<string[]>("chat:messages", -20, -1);
					if (history.length > 0) {
						server.send(JSON.stringify({
							type: "history",
							messages: history
						}));
					}
					return;
				}

				if (data.type === 'message') {
					const userId = this.sessions.get(server);
					if (!userId) return;

					const message: ChatMessage = {
						userId,
						message: data.content,
						timestamp: Date.now(),
					};

					// Store in sorted set
					await redis.zadd("chat:messages", {
						score: message.timestamp,
						member: JSON.stringify(message)
					});

					await redis.zremrangebyrank("chat:messages", 0, -101);

					// Broadcast to all sessions except sender
					const messageStr = JSON.stringify(message);
					this.sessions.forEach((_, session) => {
						if (session.readyState === WebSocket.READY_STATE_OPEN) {
							session.send(messageStr);
						}
					});
				}
			} catch (error) {
				console.error("Error handling message:", error);
			}
		});

		server.addEventListener("close", () => {
			this.sessions.delete(server);
		});

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}
}

interface Env {
	CHAT: DurableObjectNamespace;
	UPSTASH_REDIS_REST_URL: string;
	UPSTASH_REDIS_REST_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const chatId = env.CHAT.idFromName("default");
		const chatRoom = env.CHAT.get(chatId);
		return chatRoom.fetch(request);
	}
}
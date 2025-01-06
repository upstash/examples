import { useState, useEffect, useCallback, useRef } from 'react';

type ChatMessage = {
	userId: string;
	message: string;
	timestamp: number;
}
export function useChat(url: string) {
	const wsRef = useRef<WebSocket | null>(null);
	const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const currentUserId = useRef(crypto.randomUUID());

	const connect = useCallback(() => {
		const ws = new WebSocket(url);
		wsRef.current = ws;

		ws.onopen = () => {
			setStatus('connected');
			// Send userId when connection opens
			ws.send(JSON.stringify({
				type: 'init',
				userId: currentUserId.current
			}));
		};

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);

			switch (data.type) {
				case 'history':
					{
						const parsedMessages = data.messages;
						setMessages(parsedMessages);
						break;
					}
				default:
					setMessages(prevMessages => {
						const exists = prevMessages.some(msg =>
							msg.timestamp === data.timestamp && msg.userId === data.userId
						);
						return exists ? prevMessages : [...prevMessages, data];
					});
			}
		};

		ws.onclose = () => {
			setStatus('disconnected');
			setTimeout(connect, 3000);
		};

		return () => ws.close();
	}, [url]);

	useEffect(() => {
		const cleanup = connect();
		return () => {
			cleanup();
			setMessages([]);
		};
	}, [connect]);

	const sendMessage = useCallback((message: string) => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			wsRef.current.send(JSON.stringify({
				type: 'message',
				content: message
			}));
		}
	}, []);

	return {
		messages,
		status,
		sendMessage,
		currentUserId: currentUserId.current
	};
}

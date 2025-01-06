import { useRef, useEffect } from "react";
import { useChat } from "./hooks/useChat";

function App() {
  const { messages, status, sendMessage, currentUserId } = useChat(
    import.meta.env.VITE_WORKER_URL
  );
  const messageRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageRef.current?.value.trim()) {
      sendMessage(messageRef.current.value);
      messageRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto text-center mt-12 mb-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="bg-white backdrop-blur-sm h-14 px-6 rounded-2xl flex items-center justify-center 
                  shadow-lg hover:bg-white/20 transition-colors"
            >
              <img src="/upstash.png" alt="Upstash" className="h-6" />
            </div>
            <span className="text-gray-600 font-medium">+</span>
            <div
              className="bg-white backdrop-blur-sm h-14 px-6 rounded-2xl flex items-center justify-center 
                  shadow-lg hover:bg-white/20 transition-colors"
            >
              <img src="/cloudflare.png" alt="Cloudflare" className="h-6" />
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            A real-time chat example using Cloudflare Workers WebSocket API,
            deployed on Cloudflare Pages, with Upstash Redis for message
            storage.
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chat</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              status === "connected"
                ? "bg-green-100 text-green-800"
                : status === "connecting"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="bg-gray-800/50 rounded-lg shadow mb-4 backdrop-blur-sm">
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isCurrentUser = msg.userId === currentUserId;
              return (
                <div
                  key={`${msg.timestamp}-${msg.userId}`}
                  className={`flex flex-col ${
                    isCurrentUser ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 px-2">
                    <span className="text-gray-400 text-xs">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="text-blue-400 text-sm font-medium">
                      {msg.userId.slice(0, 6)}
                    </span>
                  </div>
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl ${
                      isCurrentUser
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-700 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    <span className="block break-words">{msg.message}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-700/50 p-4 flex gap-2"
          >
            <input
              ref={messageRef}
              type="text"
              placeholder="Type a message..."
              disabled={status !== "connected"}
              className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md 
                       focus:outline-none focus:border-blue-500 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={status !== "connected"}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

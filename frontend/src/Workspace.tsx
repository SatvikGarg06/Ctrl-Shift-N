import { useState } from "react";

export default function ChatSidebar() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help?", sender: "bot" },
    { text: "I need some information.", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="h-screen w-[500px] bg-black fixed left-0 flex flex-col shadow-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-purple-500 text-white self-end ml-auto"
                : "bg-gray-700 text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-gray-900 flex items-center border-t border-gray-700">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md outline-none bg-gray-800 text-white"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-3 px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}

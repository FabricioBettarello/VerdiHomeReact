import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import ChatBox from "./ChatBox.jsx";
import ChatInput from "./ChatInput.jsx";
import useCreateChat from "../../hooks/useCreateChat.jsx";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 900);
  const { sendMessage, messages, loading } = useCreateChat();
  const botName = "VerdiHome IA";

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const chatBox = document.querySelector(".chatbot-chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages, loading]);

  return (
    <div className="app-container">
      <button
        className={`sidebar-toggle ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
        onClick={toggleSidebar}
      >
        <i className="bi bi-window-sidebar"></i>
      </button>
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`chatbot-container ${isSidebarOpen ? "" : "full-width"}`}>
        <ChatBox messages={messages} loading={loading} botName={botName} />
        <ChatInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
        <p className="warning-text">VerdiHome IA pode cometer erros. Considere verificar informações importantes.</p>
      </div>
    </div>
  );
};

export default Chatbot;

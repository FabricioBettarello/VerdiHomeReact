import Message from "./Message.jsx";
import { HashLoader } from "react-spinners";

const ChatBox = ({ messages, loading, botName }) => {
  return (
    <div className="chatbot-chat-box">
      <ul className="chatbot-messages">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} botName={botName} />
        ))}
        {loading && (
          <li className="chatbot-loading">
            <HashLoader color="#28a745" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default ChatBox;

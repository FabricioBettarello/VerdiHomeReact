import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CodeBlock from "./CodeBlock.jsx";
import botImage from "/favicon.png";

const Message = ({ msg, botName }) => {
  const isUser = msg.role === "user";
  const messageClass = isUser ? "chatbot-message-user" : "chatbot-message-bot";

  const getMessageText = (msg) => {
    const text = typeof msg.parts[0].text === "string"
      ? msg.parts[0].text
      : JSON.stringify(msg.parts[0].text);

    if (text.includes("<code>") || text.includes("```")) {
      return `\`\`\`html\n${text.replace(/<\/?code>/g, "")}\n\`\`\``;
    }

    return text.replace(/\n/g, "  \n");
  };

  return (
    <li className={`chatbot-message ${messageClass}`}>
      {!isUser && <img src={botImage} alt={`${botName} avatar`} className="chatbot-avatar" />}
      <div className="chatbot-message-content">
        {!isUser && <div className="chatbot-message-header"><strong>{botName}</strong></div>}
        <div className="chatbot-bubble">
          <Markdown
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} />
                ) : (
                  <code {...props}>{children}</code>
                );
              },
            }}
          >
            {getMessageText(msg)}
          </Markdown>
        </div>
      </div>
    </li>
  );
};

export default Message;

const ChatInput = ({ message, setMessage, handleSendMessage }) => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };
  
    return (
      <form onSubmit={(e) => e.preventDefault()} className="chatbot-input">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem"
          className="chatbot-textarea"
          rows="1"
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className={`chatbot-submit ${message.trim() === "" ? "disabled" : ""}`}
          disabled={message.trim() === ""}
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
    );
  };
  
  export default ChatInput;
  
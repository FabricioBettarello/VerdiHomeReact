import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-container">
      <button
        onClick={handleCopy}
        className={`copy-button ${copied ? "copied" : ""}`}
      >
        {copied ? "Copiado!" : "Copiar"}
      </button>
      <SyntaxHighlighter language={language} style={docco} showLineNumbers wrapLongLines>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

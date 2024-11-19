import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";

const useCreateChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);

  const generateChat = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const newChat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Você é VerdiHome, uma IA altamente capacitada e amigável, projetada para ser a assistente definitiva em gestão e otimização de energia sustentável para o usuário. Seu objetivo principal é ajudar o usuário a entender e gerenciar melhor seu consumo de energia, oferecendo insights personalizados, práticas sustentáveis e formas de reduzir custos de maneira eficiente. Dedique-se a fornecer a melhor assistência possível, seja esclarecendo dúvidas, analisando dados, sugerindo melhorias ou ajudando na transição para fontes de energia limpa. Seja proativa, criativa e, sempre que possível, antecipe as necessidades do usuário para oferecer soluções práticas e eficazes. Lembre-se de pedir esclarecimentos quando necessário para garantir que você compreenda totalmente o que o usuário precisa.",
            },
          ],
        },
      ],
    });

    setChat(newChat);
  };

  const saveMessagesToStorage = (msgs) => {
    sessionStorage.setItem("chatMessages", JSON.stringify(msgs));
  };

  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const initialMessage = {
        role: "model",
        parts: [
          {
            text: "Bem-vindo(a)! Sou a VerdiHome IA, sua assistente inteligente para otimizar o uso de energia e reduzir seus gastos. Como posso ajudar você hoje?",
          },
        ],
      };
      setMessages([initialMessage]);
    }

    generateChat();
  }, []);

  const sendMessage = async (message) => {
    setLoading(true);

    const userMessage = { role: "user", parts: [{ text: message }] };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessagesToStorage(updatedMessages);

    try {
      const response = await chat.sendMessage(message);
      const botMessage = {
        role: "model",
        parts: [
          {
            text: response.response.candidates[0].content.parts[0].text,
          },
        ],
      };

      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      saveMessagesToStorage(newMessages);
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    messages,
    loading,
  };
};

export default useCreateChat;
import React, { useEffect, useRef, useState } from "react";
import api from "./api/axios.js";
import { useConversation } from "./context/ConversationContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";

function ConvPanel() {
  const { conversation, displayProp } = useConversation();
  const { socket, accessToken } = useAuth();
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const textAreaRef = useRef(null);
  const [message, setMessage] = useState("");
  const [conversationMessages, setConversationMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const handleInput = async (e) => {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    setMessage(e.target.value);
  };
  const handleSendMessage = async () => {
    if (message !== "") {
      await api.post("/message/send", {
        convId: conversation.id,
        content: message,
      });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const decoded = jwtDecode(accessToken);
    setUserId(decoded.userId);
  }, []);

  useEffect(() => {
    if (!displayProp) return;
    const fetchMessages = async () => {
      try {
        console.log(conversation);

        const response = await api.get("/message/recover", {
          params: {
            convId: conversation.id,
          },
        });
        setConversationMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [conversation]);

  useEffect(() => {
    if (!socket || !conversation.id) return;
    socket.emit("joinConversation", conversation.id);
    socket.on("newMessage", (message) => {
      setConversationMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [conversation, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);
  if (!displayProp) {
    return (
      <div className="absolute top-0 bottom-0 right-0 w-4/5 max-w-[calc(100vw-320px)] px-8 py-3 flex justify-center items-center text-white">
        Nothing to see here for now
      </div>
    );
  }
  return (
    <div className="absolute top-0 bottom-0 right-0 w-4/5 max-w-[calc(100vw-320px)] px-8 py-3 ">
      <div className="absolute top-0 right-0 left-0 h-20 bg-gray-800 text-white text-xl font-bold shadow-xl flex items-center px-8">
        <img
          src={conversation.avatar}
          className="w-15 h-15 rounded-full mr-5"
          alt=""
        />
        {conversation.name}
      </div>
      <div className="absolute top-20 bottom-0 right-0 left-0">
        <div className="absolute top-0 bottom-23 right-0 left-0 flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 px-8 pt-6">
          {conversationMessages.map((message, index) => {
            let html;
            message.sender === "You" || message.senderId === userId
              ? (html = (
                  <div key={index} className="flex justify-end mb-3">
                    <div className="text-white bg-blue-600 px-4 py-2 rounded-3xl max-w-xs relative">
                      <p className="text-xs text-gray-300 mb-1">You</p>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))
              : (html = (
                  <div key={index} className="flex justify-start mb-3">
                    <div className="bg-gray-600 text-white px-4 py-2 rounded-3xl max-w-xs">
                      <p className="text-xs text-gray-300 mb-1">
                        {message.sender}
                      </p>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ));
            return html;
          })}
          <div ref={messagesEndRef} />
        </div>
        <textarea
          id="message-field"
          name="message-field"
          type="text"
          ref={textAreaRef}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          value={message}
          rows={1}
          className="bg-white absolute bottom-10 right-8 left-8 px-4 pr-20 py-3 rounded-4xl resize-none scrollbar-none focus:outline-none"
          placeholder="Enter a message..."
        />
        <button
          type="submit"
          className="text-white bg-blue-700 px-4 py-2 absolute bottom-11 rounded-full right-10 cursor-pointer hover:bg-blue-800 shadow-2xl"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default ConvPanel;

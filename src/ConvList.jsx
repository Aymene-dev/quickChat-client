import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import api from "./api/axios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { useConversation } from "./context/ConversationContext.jsx";

function ConvList() {
  const [conversations, setConversations] = useState([]);
  const { sendConv, lastUpdate } = useConversation();
  const [selectedConv, setSelectedConv] = useState(null);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await api.get("/conversation/userConvs");
        const fetchedConvsInfo = response.data.convsInfo;
        const fetchedInterlocutors = response.data.interlocutors;
        const conversationsList = await Promise.all(
          fetchedConvsInfo.map(async (conv) => {
            const lastMessage = await api.get("/message/last-message", {
              params: { convId: conv._id },
            });
            if (conv.type === "group") {
              return {
                _id: conv._id,
                name: conv.name,
                avatar: conv.avatar,
                type: "group",
                lastMessage,
                role: conv.userRole,
              };
            }
            const interlocutor = fetchedInterlocutors
              .map((member) => {
                if (member._convId === conv._id) {
                  return {
                    _id: conv._id,
                    name: member.username,
                    avatar: member.avatar,
                    type: "private",
                    lastMessage,
                  };
                } else return null;
              })
              .filter(Boolean)
              .flat();
            return interlocutor[0];
          }),
        );
        setConversations(conversationsList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, [lastUpdate]);

  return (
    <ul
      className="w-full overflow-y-auto transition-all duration-300
            [&::-webkit-scrollbar]:w-2 
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:rounded-full 
            [&::-webkit-scrollbar-button]:hidden
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
    >
      {conversations.map((conv, index) => {
        return (
          <li
            key={index}
            className={`flex items-center mx-auto py-2 px-1 w-full cursor-pointer rounded-md hover:bg-gray-700 
              ${conv._id === selectedConv ? "bg-gray-700" : "bg-transparent"}`}
            id={conv._id}
            onClick={() => {
              sendConv(conv);
              setSelectedConv(conv._id);
            }}
          >
            <img
              src={conv.avatar}
              className="w-18 h-18 rounded-full mr-6"
              alt=""
            />
            <div>
              <p className="text-white text-lg font-bold">
                {conv.name}{" "}
                {conv.type === "group" ? (
                  <FontAwesomeIcon icon={faPeopleGroup} />
                ) : null}
              </p>
              <p className="text-white opacity-70 overflow-hidden">
                {conv.lastMessage.data.content}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ConvList;

import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import api from "./api/axios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { useConversation } from "./context/ConversationContext.jsx";

function ConvList() {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await api.get("/conversation/userConvs");
        const fetchedConvsInfo = response.data.convsInfo;
        const fetchedInterlocutors = response.data.interlocutors;
        const conversationsList = fetchedConvsInfo.map((conv) => {
          if (conv.type === "group") {
            return {
              id: conv._id,
              name: conv.name,
              avatar: conv.avatar,
              type: "group",
            };
          }
          const interlocutor = fetchedInterlocutors
            .map((member) => {
              if (member._convId === conv._id) {
                return {
                  id: conv._id,
                  name: member.username,
                  avatar: member.avatar,
                  type: "private",
                };
              } else return null;
            })
            .filter(Boolean)
            .flat();
          return interlocutor[0];
        });
        setConversations(conversationsList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, []);

  const { sendConv } = useConversation();

  return (
    <ul className="w-full">
      {conversations.map((conv, index) => {
        return (
          <li
            key={index}
            className="flex items-center mx-auto py-2 px-1 w-full cursor-pointer rounded-md hover:bg-gray-700"
            id={conv.id}
            onClick={() => {
              sendConv(conv);
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
                test message
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ConvList;

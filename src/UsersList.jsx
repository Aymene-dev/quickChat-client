import React, { useEffect, useState } from "react";
import { useConversation } from "./context/ConversationContext.jsx";
import api from "./api/axios";
import { useAuth } from "./context/AuthContext.jsx";

function UsersList({ display, results = [], setQuery }) {
  const { triggerRefresh, sendConv } = useConversation();
  const { tokenRef } = useAuth();
  const handleConvCreation = async (user) => {
    setQuery("");
    const response = await api.post("/conversation/createConversation", {
      userIds: [user._id],
    });
    const newConv = {
      _id: response.data.conversation._id,
      name: user.username,
      avatar: user.avatar,
      type: "private",
    };
    sendConv(newConv);
    triggerRefresh();
  };
  return (
    <ul
      className={`absolute top-27 bg-white min-w-2xs px-2 py-1 pt-2 z-10 rounded-md ${display}`}
    >
      {results.map((user, index) => {
        return (
          <li
            key={index}
            id={user._id}
            className="flex items-center mx-auto text-lg cursor-pointer py-1 px-2 font-bold rounded-sm hover:bg-gray-300 mb-1"
            onClick={() => handleConvCreation(user)}
          >
            <img
              src={user.avatar}
              className="w-12 h-12 rounded-full mr-6"
              alt=""
            />
            {user.username}
          </li>
        );
      })}
    </ul>
  );
}

export default UsersList;

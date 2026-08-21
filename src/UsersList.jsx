import React, { useEffect, useState } from "react";
import api from "./api/axios";

function UsersList({ display, results = [], setQuery }) {
  const handleConvCreation = async (id, name) => {
    const response = await api.post("/conversation/createConversation", {
      userIds: [id],
    });
    setQuery("");
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
            onClick={() => handleConvCreation(user._id)}
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

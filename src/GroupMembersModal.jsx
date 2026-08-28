import React, { useEffect, useState } from "react";
import api from "./api/axios";
import { useConversation } from "./context/ConversationContext.jsx";

function GroupMembersModal() {
  const { conversation } = useConversation();
  const [groupMembers, setGroupMembers] = useState([]);
  useEffect(() => {
    const fetchGroupMembers = async () => {
      const response = await api.get("/conversation/convMembers", {
        params: {
          convId: conversation._id,
        },
      });
      setGroupMembers(response.data);
    };
    fetchGroupMembers();
  }, [conversation]);
  return (
    <>
      <h1 className="mt-7 text-3xl font-bold">Group members</h1>
      <ul className="w-3/4 mt-7">
        {groupMembers.map((member, index) => {
          return (
            <React.Fragment key={index}>
              <li key={index} className="mb-5 flex items-center">
                <img
                  src={member.avatar}
                  className="w-18 h-18 rounded-full mr-6"
                  alt=""
                />
                <div>
                  <p className="font-bold text-2xl">{member.username}</p>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </li>
              {index !== groupMembers.length - 1 ? (
                <div className="h-px w-full my-1 mx-auto bg-black opacity-55"></div>
              ) : (
                <></>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}

export default GroupMembersModal;

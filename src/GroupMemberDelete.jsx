import React, { useState, useEffect } from "react";
import api from "./api/axios";
import { useConversation } from "./context/ConversationContext.jsx";
import { useGroupModal } from "./context/GroupModalContext.jsx";

function GroupMemberDelete() {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { conversation, triggerRefresh } = useConversation();
  const {
    setRenderGroupMembers,
    setDisplayGroupMenuModal,
    setRenderDeleteMember,
  } = useGroupModal();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get("/conversation/convMembers", {
          params: { convId: conversation._id },
        });
        setMembers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMembers();
  }, []);

  const toggleSelect = (userId) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const handleSubmit = async () => {
    if (selectedMembers.length === 0) return;
    try {
      await Promise.all(
        selectedMembers.map((memberId) =>
          api.delete("/conversation/deleteMember", {
            data: { memberId, convId: conversation._id },
          }),
        ),
      );
      triggerRefresh();
      setRenderGroupMembers(false);
      setDisplayGroupMenuModal(false);
      setRenderDeleteMember(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="mt-7 text-3xl font-bold mb-5">Remove members</h1>
      <div className="flex flex-col w-full px-6">
        <p className="text-gray-500 text-sm mb-4">
          Select the members you want to remove
        </p>

        {/* liste des membres */}
        <ul className="w-full">
          {members.map((member, index) => {
            const isSelected = selectedMembers.includes(member._userId);
            return (
              <React.Fragment key={member._userId}>
                <li
                  className="flex items-center py-2 px-3 cursor-pointer hover:bg-gray-100 rounded-lg"
                  onClick={() => toggleSelect(member._userId)}
                >
                  {/* checkbox */}
                  <div
                    className={`w-5 h-5 border-2 rounded mr-4 flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-red-500 border-red-500"
                        : "border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </div>

                  <img
                    src={member.avatar}
                    className="w-10 h-10 rounded-full mr-4"
                    alt=""
                  />
                  <span className="font-bold">{member.username}</span>
                  {member.role === "admin" && (
                    <span className="ml-auto text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                      admin
                    </span>
                  )}
                </li>
                {index !== members.length - 1 && (
                  <div className="w-full h-px bg-gray-200" />
                )}
              </React.Fragment>
            );
          })}
        </ul>

        {/* compteur */}
        <p className="text-sm text-gray-500 mt-4">
          {selectedMembers.length} member
          {selectedMembers.length !== 1 ? "s" : ""} selected
        </p>

        <button
          type="button"
          className={`mt-6 mx-auto px-4 py-2 rounded-lg text-white cursor-pointer ${
            selectedMembers.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={handleSubmit}
          disabled={selectedMembers.length === 0}
        >
          Remove selected members
        </button>
      </div>
    </>
  );
}

export default GroupMemberDelete;

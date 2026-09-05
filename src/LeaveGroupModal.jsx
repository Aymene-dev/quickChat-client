import React from "react";
import api from "./api/axios";
import { useConversation } from "./context/ConversationContext.jsx";
import { useGroupModal } from "./context/GroupModalContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function LeaveGroupModal() {
  const { conversation, triggerRefresh, setConversation } = useConversation();
  const { setDisplayGroupMenuModal, setRenderLeaveGroup } = useGroupModal();
  const { userId } = useAuth();

  const handleLeave = async () => {
    try {
      await api.delete("/conversation/deleteMember", {
        data: {
          memberId: userId,
          convId: conversation._id,
        },
      });
      setConversation({});
      triggerRefresh();
      setRenderLeaveGroup(false);
      setDisplayGroupMenuModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setRenderLeaveGroup(false);
    setDisplayGroupMenuModal(false);
  };

  return (
    <>
      <h1 className="mt-7 text-2xl font-bold mb-3">Leave the group</h1>
      <p className="text-gray-500 text-sm mb-8 px-6 text-center">
        Are you sure you want to leave{" "}
        <span className="font-bold text-black">{conversation.name}</span> ? You
        won't be able to see the messages anymore.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          className="px-5 py-2 rounded-lg bg-gray-200 text-black cursor-pointer hover:bg-gray-300"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-5 py-2 rounded-lg bg-red-500 text-white cursor-pointer hover:bg-red-600"
          onClick={handleLeave}
        >
          Leave
        </button>
      </div>
    </>
  );
}

export default LeaveGroupModal;

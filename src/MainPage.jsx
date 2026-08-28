import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import { useConversation } from "./context/ConversationContext.jsx";
import Sidebar from "./Sidebar.jsx";
import ConvPanel from "./ConvPanel.jsx";
import GroupCreationModal from "./GroupCreationModal.jsx";
import GroupModal from "./GroupModal.jsx";

function MainPage() {
  const { accessToken, socket } = useAuth();
  const { triggerRefresh } = useConversation();
  const [conversation, setConversation] = useState("");
  useEffect(() => {
    if (!socket) return;

    socket.on("convUpdated", () => {
      triggerRefresh();
    });

    return () => socket.off("convUpdated");
  }, [socket]);
  return (
    <div className="w-full h-screen bg-blue-950">
      <div className="w-full h-full flex justify-center items-center">
        <GroupCreationModal />
        <GroupModal />
      </div>
      <Sidebar />
      <ConvPanel />
    </div>
  );
}

export default MainPage;

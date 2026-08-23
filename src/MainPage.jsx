import React, { useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import Sidebar from "./Sidebar.jsx";
import ConvPanel from "./ConvPanel.jsx";
import GroupCreationModal from "./GroupCreationModal.jsx";

function MainPage() {
  const { accessToken } = useAuth();
  const [conversation, setConversation] = useState("");
  return (
    <div className="w-full h-screen bg-blue-950">
      <div className="w-full h-full flex justify-center items-center">
        <GroupCreationModal />
      </div>
      <Sidebar />
      <ConvPanel />
    </div>
  );
}

export default MainPage;

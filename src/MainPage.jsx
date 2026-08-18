import React, { useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import Sidebar from "./Sidebar.jsx";
import ConvPanel from "./ConvPanel.jsx";

function MainPage() {
  const { accessToken } = useAuth();
  const [conversation, setConversation] = useState("");
  return (
    <div className="w-full h-screen bg-blue-950">
      <Sidebar />
      <ConvPanel />
    </div>
  );
}

export default MainPage;

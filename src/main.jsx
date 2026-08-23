import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ConversationProvider } from "./context/ConversationContext.jsx";
import { GroupModalProvider } from "./context/GroupModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ConversationProvider>
        <GroupModalProvider>
          <App />
        </GroupModalProvider>
      </ConversationProvider>
    </AuthProvider>
  </BrowserRouter>,
);

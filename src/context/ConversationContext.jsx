import { createContext, useContext, useEffect, useState } from "react";

const ConversationContext = createContext(null);

const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState({});
  const [displayProp, setDisplayProp] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const sendConv = (conv) => {
    setConversation(conv);
    setDisplayProp(true);
  };

  const triggerRefresh = () => {
    setLastUpdate(Date.now);
  };

  return (
    <ConversationContext.Provider
      value={{ conversation, displayProp, sendConv,lastUpdate, triggerRefresh, setConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

const useConversation = () => useContext(ConversationContext);

export { useConversation, ConversationProvider };

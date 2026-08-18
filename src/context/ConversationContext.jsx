import { createContext, useContext, useEffect, useState } from "react";

const ConversationContext = createContext(null);

const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState({});
  const [displayProp, setDisplayProp] = useState(false);

  const sendConv = (conv) => {
    setConversation(conv);
    setDisplayProp(true);
  };

  return (
    <ConversationContext.Provider
      value={{ conversation, displayProp, sendConv }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

const useConversation = () => useContext(ConversationContext);

export { useConversation, ConversationProvider };

import { useContext, createContext, useState } from "react";

const GroupModalContext = createContext(null);

const GroupModalProvider = ({ children }) => {
  const [displayGroupModal, setDisplayGroupModal] = useState(false);
  return (
    <GroupModalContext.Provider
      value={{ displayGroupModal, setDisplayGroupModal }}
    >
      {children}
    </GroupModalContext.Provider>
  );
};

const useGroupModal = () => useContext(GroupModalContext);
export { GroupModalProvider, useGroupModal };

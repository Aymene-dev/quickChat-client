import { useContext, createContext, useState } from "react";

const GroupModalContext = createContext(null);

const GroupModalProvider = ({ children }) => {
  const [displayGroupModal, setDisplayGroupModal] = useState(false);
  const [displayGroupMenuModal, setDisplayGroupMenuModal] = useState(false);
  const [renderGroupMembers, setRenderGroupMembers] = useState(false);
  const [renderAddMember, setRenderAddMember] = useState(false);
  const [renderDeleteMember, setRenderDeleteMember] = useState(false);
  return (
    <GroupModalContext.Provider
      value={{
        displayGroupModal,
        setDisplayGroupModal,
        displayGroupMenuModal,
        setDisplayGroupMenuModal,
        renderGroupMembers,
        setRenderGroupMembers,
        renderAddMember,
        setRenderAddMember,
        renderDeleteMember,
        setRenderDeleteMember,
      }}
    >
      {children}
    </GroupModalContext.Provider>
  );
};

const useGroupModal = () => useContext(GroupModalContext);
export { GroupModalProvider, useGroupModal };

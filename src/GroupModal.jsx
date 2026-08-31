import React, { useEffect } from "react";
import { useGroupModal } from "./context/GroupModalContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GroupMembersModal from "./GroupMembersModal.jsx";
import GroupMemberAddingModal from "./GroupMemberAddingModal.jsx";
import GroupMemberDelete from "./GroupMemberDelete.jsx";

function GroupModal() {
  const {
    displayGroupMenuModal,
    setDisplayGroupMenuModal,
    renderGroupMembers,
    setRenderGroupMembers,
    renderAddMember,
    setRenderAddMember,
    renderDeleteMember,
    setRenderDeleteMember,
  } = useGroupModal();

  return (
    <div
      className={`${displayGroupMenuModal ? "block" : "hidden"} bg-black/60 w-full h-full z-50 flex justify-center items-center`}
    >
      <div className="min-w-2/5 pb-7 bg-white rounded-2xl relative flex flex-col items-center">
        <FontAwesomeIcon
          className="absolute top-5 right-5 text-red-600 cursor-pointer text-lg"
          icon={faXmark}
          onClick={() => {
            setDisplayGroupMenuModal(false);
            setRenderGroupMembers(false);
            setRenderAddMember(false);
            setRenderDeleteMember(false);
          }}
        />
        {renderGroupMembers ? <GroupMembersModal /> : <></>}
        {renderAddMember ? <GroupMemberAddingModal /> : <></>}
        {renderDeleteMember ? <GroupMemberDelete /> : <></>}
      </div>
    </div>
  );
}

export default GroupModal;

import React from "react";
import { useGroupModal } from "./context/GroupModalContext.jsx";

function GroupMenu({ display, setDisplay, role }) {
  const {
    setDisplayGroupMenuModal,
    setRenderGroupMembers,
    setRenderAddMember,
    setRenderDeleteMember,
    setRenderLeaveGroup,
  } = useGroupModal();
  return (
    <div
      className={`bg-white text-black ${display ? "block" : "hidden"} absolute right-8 top-15 z-50 px-3 py-1 rounded-xl text-lg`}
    >
      {role === "admin" ? (
        <>
          <ul className="font-normal">
            <li
              className="cursor-pointer px-2 rounded-md hover:bg-gray-300"
              onClick={() => {
                setDisplayGroupMenuModal(true);
                setRenderGroupMembers(true);
                setDisplay(false);
              }}
            >
              See group members
            </li>
            <div className="h-px w-full my-1 mx-auto bg-black opacity-75 "></div>
            <li
              className="cursor-pointer px-2 rounded-md hover:bg-gray-300"
              onClick={() => {
                setDisplayGroupMenuModal(true);
                setRenderAddMember(true);
                setDisplay(false);
              }}
            >
              Add members
            </li>
            <div className="h-px w-full my-1 mx-auto bg-black opacity-55 "></div>
            <li
              className="cursor-pointer px-2 rounded-md hover:bg-gray-300"
              onClick={() => {
                setDisplayGroupMenuModal(true);
                setRenderDeleteMember(true);
                setDisplay(false);
              }}
            >
              Delete members
            </li>
            <div className="h-px w-full my-1 mx-auto bg-black opacity-75 "></div>
            <li className="cursor-pointer px-2 rounded-md hover:bg-gray-300 text-red-500">
              Delete the group
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className="font-normal">
            <li
              className="cursor-pointer px-2 rounded-md hover:bg-gray-300"
              onClick={() => {
                setDisplayGroupMenuModal(true);
                setRenderGroupMembers(true);
                setDisplay(false);
              }}
            >
              See group members
            </li>
            <div className="h-px w-full my-1 mx-auto bg-black opacity-75 "></div>
            <li
              className="cursor-pointer px-2 rounded-md hover:bg-gray-300 text-red-500"
              onClick={() => {
                setDisplayGroupMenuModal(true);
                setRenderLeaveGroup(true);
                setDisplay(false);
              }}
            >
              Leave the group
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default GroupMenu;

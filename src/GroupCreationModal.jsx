import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGroupModal } from "./context/GroupModalContext.jsx";
import api from "./api/axios.js";

function GroupCreationModal() {
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState(""); //termine le modal (liste des users)
  const { displayGroupModal, setDisplayGroupModal } = useGroupModal();
  const handleSubmit = async () => {};
  return (
    <div
      className={`bg-black/60 w-full h-full z-50 flex justify-center items-center ${displayGroupModal ? "block" : "hidden"}`}
    >
      <div
        className={`w-3/5 h-3/5 bg-white rounded-2xl relative flex flex-col items-center`}
      >
        <FontAwesomeIcon
          className="absolute top-5 right-5 text-red-600 cursor-pointer text-lg"
          icon={faXmark}
          onClick={() => setDisplayGroupModal(false)}
        />
        <p className="">Create a new group</p>
        <form className="w-4/5 mt-8 h-full flex flex-col">
          <label htmlFor="group-name-input" className="mb-5">
            Group name
            <input
              type="text"
              id="group-name-input"
              placeholder="Enter the group's name..."
              value={groupName}
              className="block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </label>
          <label htmlFor="member-selection" className="mb-5">
            Add a member
            <input
              type="text"
              id="member-selection"
              className="block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none"
              placeholder="Search for a member..."
              onChange={(e) => setUsername(e.value.target)}
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default GroupCreationModal;

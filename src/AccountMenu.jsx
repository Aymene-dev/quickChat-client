import React from "react";
import { useAuth } from "./context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useGroupModal } from "./context/GroupModalContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useConversation } from "./context/ConversationContext.jsx";

function AccountMenu({ display, setDisplay }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { displayGroupModal, setDisplayGroupModal } = useGroupModal();
  const { setConversation } = useConversation();
  return (
    <div
      className={`${display ? "block" : "hidden"} text-lg right-1 top-13 bg-white px-2 py-2 rounded-xl absolute z-10`}
    >
      <ul>
        <li
          className="cursor-pointer px-2 rounded-md hover:bg-gray-300"
          onClick={() => {
            setDisplayGroupModal(true);
            setDisplay(false);
          }}
        >
          Create a group <FontAwesomeIcon icon={faPeopleGroup} />
        </li>
        <div className="h-px w-full my-1 mx-auto bg-black opacity-75 "></div>
        <li
          className="text-red-500 cursor-pointer px-2 rounded-md hover:bg-gray-300"
          onClick={() => {
            setConversation(null);
            logout();
            navigate("/login");
          }}
        >
          Log out <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </li>
      </ul>
    </div>
  );
}

export default AccountMenu;

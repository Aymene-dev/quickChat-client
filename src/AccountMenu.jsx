import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

function AccountMenu({ display, setDisplay }) {
  const handleLogOut = async () => {
    
  };
  return (
    <div
      className={`${display === true ? "block" : "hidden"} text-lg right-1 top-13 bg-white px-4 py-2 rounded-xl absolute z-10`}
    >
      <ul>
        <li className="cursor-pointer" onClick={() => console.log("yea")}>
          Create a group <FontAwesomeIcon icon={faPeopleGroup} />
        </li>
        <div className="h-px w-full my-1 mx-auto bg-black opacity-75"></div>
        <li
          className="text-red-500 cursor-pointer"
          onClick={() => console.log("yea")}
        >
          Log out <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </li>
      </ul>
    </div>
  );
}

export default AccountMenu;

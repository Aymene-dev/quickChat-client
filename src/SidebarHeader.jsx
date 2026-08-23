import React, { useState } from "react";
import appLogo from "./assets/QuickChat_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useGroupModal } from "./context/GroupModalContext.jsx";
import AccountMenu from "./AccountMenu.jsx";

function SidebarHeader() {
  const [menuDisplay, setMenuDisplay] = useState(false)
  return (
    <div className="flex items-center justify-between">
      <img src={appLogo} className="w-1/2" alt="" />
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        className="text-white text-2xl cursor-pointer"
        onClick={()=>{setMenuDisplay(!menuDisplay)}}
      />
      <AccountMenu display={menuDisplay} setDisplay={setMenuDisplay}/>
    </div>
  );
}

export default SidebarHeader;

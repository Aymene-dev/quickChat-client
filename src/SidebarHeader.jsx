import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useGroupModal } from "./context/GroupModalContext.jsx";
import AccountMenu from "./AccountMenu.jsx";

function SidebarHeader() {
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [appLogo, setAppLogo] = useState("https://res.cloudinary.com/dgkwexcoc/image/upload/v1788624405/QuickChat_logo_udusfw.png")
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

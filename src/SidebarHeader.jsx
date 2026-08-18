import React from "react";
import appLogo from "./assets/QuickChat_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

function SidebarHeader() {
  return (
    <div className="flex items-center justify-between">
      <img src={appLogo} className="w-1/2" alt="" />
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        className="text-white text-2xl cursor-pointer"
        onClick={()=>console.log("good")}
      />
    </div>
  );
}

export default SidebarHeader;

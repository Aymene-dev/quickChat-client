import React, { useEffect, useState } from "react";
import { useSuccessMsg } from "./context/SuccessMessageContext.jsx";

function SuccessMessage() {
  const [width, setWidth] = useState(100);

  const { successMsgDisplay, setSuccessMsgDisplay } = useSuccessMsg();

  useEffect(() => {
    if (!successMsgDisplay) return;

    const timerAnimation = setTimeout(() => setWidth(0), 50);
    const timerHide = setTimeout(() => {
      setSuccessMsgDisplay(false);
      setWidth(100);
    }, 3010);

    return () => {
      clearTimeout(timerAnimation);
      clearTimeout(timerHide);
    };
  }, [successMsgDisplay]);

  return (
    <div
      className={`bg-green-100 text-green-500 border-green-500 border-2 px-4 py-4 rounded-xl text-xl absolute top-6 right-6 ${successMsgDisplay ? "block" : "hidden"}`}
    >
      Your account has been successfully created.
      <div
        className="h-2 bg-green-500 absolute bottom-0 left-0 rounded-bl-xl"
        style={{
          width: `${width}%`,
          transition: "width 3s linear",
        }}
      />
    </div>
  );
}

export default SuccessMessage;

import { createContext, useContext, useState } from "react";

const successMessageContext = createContext(null);

const SuccessMessageProvider = ({ children }) => {
  const [successMsgDisplay, setSuccessMsgDisplay] = useState(false);
  return (
    <successMessageContext.Provider
      value={{ successMsgDisplay, setSuccessMsgDisplay }}
    >
      {children}
    </successMessageContext.Provider>
  );
};

const useSuccessMsg = () => useContext(successMessageContext);
export { useSuccessMsg, SuccessMessageProvider };

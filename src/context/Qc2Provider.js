import React, { createContext, useState } from "react";

export const Qc2Context = createContext(null);
const Qc2Provider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  // tabledata
  const [qc2PrintTableData, setQc2PrintTableData] = useState([]);
  return (
    <Qc2Context.Provider
      value={{
        // token for authentication
        userToken,
        setUserToken,
        // tableData
        qc2PrintTableData,
        setQc2PrintTableData,
      }}
    >
      {children}
    </Qc2Context.Provider>
  );
};

export default Qc2Provider;

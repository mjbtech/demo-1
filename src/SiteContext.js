import React, { createContext, useState, useEffect } from "react";

export const SiteContext = createContext();
export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <SiteContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

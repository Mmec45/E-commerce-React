import { createContext, useState } from "react";

// actualiser les valeurs donc a besoin l'user
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// export le context pour avoir acees dans l'app
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
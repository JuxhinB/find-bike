import React, { createContext } from "react";

interface UserProviderProps {
  children: JSX.Element;
}
interface IUserContextTypes {}

const USER_CONTEXT_INITIAL_VALUES = {};

export const UserContext = createContext<IUserContextTypes>({
  ...USER_CONTEXT_INITIAL_VALUES,
});

function UserProvider({ children }: UserProviderProps) {
  const providerValue = {};

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

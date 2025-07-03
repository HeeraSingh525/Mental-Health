import { createContext, useContext, useState } from 'react';

export const NavFunctionContext = createContext();

export const NavFunctionProvider = ({ children }) => {
  const [navItemFunction, setNavItemFunction] = useState(() => () => {});

  return (
    <NavFunctionContext.Provider value={{ navItemFunction, setNavItemFunction }}>
      {children}
    </NavFunctionContext.Provider>
  );
};

export const useNavFunction = () => useContext(NavFunctionContext);

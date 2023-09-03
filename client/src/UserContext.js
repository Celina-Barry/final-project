import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginEmail, setLoginEmail] = useState('');

  const updateLoginEmail = (email) => {
    setLoginEmail(email);
    localStorage.setItem('loginEmail', email); 
  };

  return (
    <UserContext.Provider value={{ loginEmail, updateLoginEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

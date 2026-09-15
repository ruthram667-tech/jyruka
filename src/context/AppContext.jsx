import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userRole, setUserRole] = useState('client'); // 'client' | 'admin'
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('jyruka_auth') === 'true';
  });
  const [inquiriesCount, setInquiriesCount] = useState(4);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('jyruka_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jyruka_auth');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        isAuthenticated,
        login,
        logout,
        inquiriesCount,
        setInquiriesCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

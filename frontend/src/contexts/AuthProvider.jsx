import React, { useState, useMemo, useCallback } from 'react';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId')) ?? null;
  const [user, setLoggedIn] = useState(currentUser);

  const logIn = useCallback((userData) => {
    const newUser = localStorage.setItem('userId', JSON.stringify(userData));
    console.log(localStorage);
    setLoggedIn(newUser);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem('userId');
    if (token) {
      return {
        Authorization: `Bearer ${user.token}`,
      };
    }
    return {};
  }, [user]);

  const memorizedValue = useMemo(() => ({
    logIn,
    logOut,
    user,
    getAuthHeader,
  }), [logIn, logOut, user, getAuthHeader]);
  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

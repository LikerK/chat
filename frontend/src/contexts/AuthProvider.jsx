import React, { useState, useMemo, useCallback } from 'react';
import AuthContext from './index.jsx';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user')) ?? null;
  const [user, setUser] = useState(currentUser);

  const logIn = useCallback(() => {
    setUser(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('user'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    logOut();
    return {};
  }, [logOut]);

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

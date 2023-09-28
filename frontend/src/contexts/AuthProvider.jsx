import React, { useState, useMemo, useCallback } from 'react';
import { AuthContext } from '.';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user')) ?? null;
  const [user, setUser] = useState(currentUser);

  const logIn = useCallback((data) => {
    localStorage.setItem('user', JSON.stringify(data));
    console.log(localStorage);
    setUser(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
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

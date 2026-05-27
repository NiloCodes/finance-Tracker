import { useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { setToken as storeToken, clearToken } from "../auth/authStore";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (userData, jwt) => {
    storeToken(jwt); // sync to authStore so axios interceptor can read it
    setToken(jwt);
    setUser(userData);
  };

  const logout = () => {
    clearToken(); // clear authStore too
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

import { useState } from "react";
import AuthContext from "./AuthContext";
import { getToken, setToken as storeToken, clearToken } from "./AuthStore";
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(null);

  const login = (userData, jwt) => {
    storeToken(jwt);
    setToken(jwt);
    setUser(userData);
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

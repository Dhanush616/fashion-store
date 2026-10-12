import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("fs_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem("fs_user", JSON.stringify(user));
      else localStorage.removeItem("fs_user");
    } catch {
      /* ignore */
    }
  }, [user]);

  const login = (email) => {
    const u = { email, name: email.split("@")[0], loginAt: new Date().toISOString() };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout, isLoggedIn: !!user }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

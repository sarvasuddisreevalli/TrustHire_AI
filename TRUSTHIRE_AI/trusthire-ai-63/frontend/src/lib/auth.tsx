import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { apiLogin, apiRegister, apiGetMe, type UserData } from "./api";

export type Role = "user" | "recruiter" | "admin" | null;

type AuthState = {
  role: Role;
  name: string;
  email: string;
  company: string;
  verificationStatus: string;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ role: string }>;
  register: (data: {
    name: string; email: string; password: string; role?: string;
    company?: string; website?: string; linkedin?: string;
    registrationId?: string; phone?: string;
  }) => Promise<{ role: string; verificationStatus?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("th_token") : null;
    if (stored) {
      setToken(stored);
      apiGetMe()
        .then(({ user: u }) => setUser(u))
        .catch(() => {
          localStorage.removeItem("th_token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    localStorage.setItem("th_token", res.token);
    setToken(res.token);
    setUser(res.user);
    return { role: res.user.role };
  }, []);

  const register = useCallback(async (data: {
    name: string; email: string; password: string; role?: string;
    company?: string; website?: string; linkedin?: string;
    registrationId?: string; phone?: string;
  }) => {
    const res = await apiRegister(data);
    // For recruiters, don't store token (they need approval first)
    if (data.role === "recruiter") {
      return { role: res.user.role, verificationStatus: res.user.verificationStatus };
    }
    localStorage.setItem("th_token", res.token);
    setToken(res.token);
    setUser(res.user);
    return { role: res.user.role };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("th_token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      role: (user?.role as Role) ?? null,
      name: user?.name ?? "",
      email: user?.email ?? "",
      company: user?.company ?? "",
      verificationStatus: user?.verificationStatus ?? "",
      token,
      loading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "lumen_auth";
const USERS_KEY = "lumen_users";
const TOKEN_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}
function writeUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function makeToken(user) {
  return btoa(JSON.stringify({ uid: user.id, exp: Date.now() + TOKEN_TTL }));
}
function readToken(token) {
  try { return JSON.parse(atob(token)); } catch { return null; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { token } = JSON.parse(raw);
        const decoded = readToken(token);
        if (decoded && decoded.exp > Date.now()) {
          const u = readUsers().find((x) => x.id === decoded.uid);
          if (u) setUser({ id: u.id, email: u.email, username: u.username, avatar: u.avatar });
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {}
    setLoading(false);
  }, []);

  const register = async ({ username, email, password }) => {
    await new Promise((r) => setTimeout(r, 400));
    const users = readUsers();
    if (users.some((u) => u.email === email)) throw new Error("Email already registered");
    const newUser = { id: crypto.randomUUID(), username, email, password, avatar: null, createdAt: Date.now() };
    users.push(newUser);
    writeUsers(users);
    const token = makeToken(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token }));
    setUser({ id: newUser.id, email, username, avatar: null });
    return newUser;
  };

  const login = async ({ email, password, remember = true }) => {
    await new Promise((r) => setTimeout(r, 400));
    const u = readUsers().find((x) => x.email === email && x.password === password);
    if (!u) throw new Error("Invalid email or password");
    const token = makeToken(u);
    if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify({ token }));
    else sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ token }));
    setUser({ id: u.id, email: u.email, username: u.username, avatar: u.avatar });
    return u;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = (patch) => {
    if (!user) return;
    const users = readUsers().map((u) => (u.id === user.id ? { ...u, ...patch } : u));
    writeUsers(users);
    setUser((prev) => ({ ...prev, ...patch }));
  };

  const changePassword = async (oldPw, newPw) => {
    const users = readUsers();
    const u = users.find((x) => x.id === user.id);
    if (!u || u.password !== oldPw) throw new Error("Current password is incorrect");
    u.password = newPw;
    writeUsers(users);
  };

  const deleteAccount = () => {
    if (!user) return;
    writeUsers(readUsers().filter((u) => u.id !== user.id));
    logout();
  };

  const requestPasswordReset = async (email) => {
    await new Promise((r) => setTimeout(r, 600));
    const found = readUsers().some((u) => u.email === email);
    return found;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, updateProfile, changePassword, deleteAccount, requestPasswordReset }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

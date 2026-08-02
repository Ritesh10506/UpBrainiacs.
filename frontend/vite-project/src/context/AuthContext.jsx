import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("ub_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setStudent(await res.json());
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loginWithGoogle = async (credential) => {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    });
    if (!res.ok) throw new Error("Google login failed");
    const data = await res.json();
    localStorage.setItem("ub_token", data.access_token);
    setToken(data.access_token);
    setStudent(data.student);
    return data.student;
  };

  const requestOtp = async (email) => {
    const res = await fetch(`${API_URL}/auth/otp/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Could not send OTP");
    }
    return res.json();
  };

  const verifyOtp = async (email, otp) => {
    const res = await fetch(`${API_URL}/auth/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "OTP verification failed");
    }
    const data = await res.json();
    localStorage.setItem("ub_token", data.access_token);
    setToken(data.access_token);
    setStudent(data.student);
    return data.student;
  };

  const logout = () => {
    localStorage.removeItem("ub_token");
    setToken(null);
    setStudent(null);
  };

  return (
    <AuthContext.Provider
      value={{ student, token, loading, loginWithGoogle, requestOtp, verifyOtp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
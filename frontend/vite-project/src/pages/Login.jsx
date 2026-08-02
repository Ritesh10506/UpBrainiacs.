import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { loginWithGoogle, requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("choose"); // choose | otp-email | otp-code
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    try {
      await loginWithGoogle(credentialResponse.credential);
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await requestOtp(email);
      setMode("otp-code");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await verifyOtp(email, otp);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="student-login-section">
      <div className="student-login-card">
        <h1>Student Login</h1>
        <p className="login-subtitle">Sign in to track your MBBS abroad application</p>

        {error && <div className="login-error">{error}</div>}

        {mode === "choose" && (
          <>
            <div className="google-btn-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed.")}
              />
            </div>

            <div className="login-divider">
              <span>or</span>
            </div>

            <button className="otp-toggle-btn" onClick={() => setMode("otp-email")}>
              Continue with Email OTP
            </button>
          </>
        )}

        {mode === "otp-email" && (
          <form onSubmit={handleSendOtp} className="login-form">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <button type="submit" disabled={busy}>
              {busy ? "Sending..." : "Send OTP"}
            </button>
            <button type="button" className="link-btn" onClick={() => setMode("choose")}>
              Back
            </button>
          </form>
        )}

        {mode === "otp-code" && (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <p className="otp-sent-note">OTP sent to {email}</p>
            <label htmlFor="otp">6-digit code</label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
            />
            <button type="submit" disabled={busy}>
              {busy ? "Verifying..." : "Verify & Login"}
            </button>
            <button type="button" className="link-btn" onClick={() => setMode("otp-email")}>
              Use a different email
            </button>
          </form>
        )}

        <p className="login-note">
          We only use this to verify your identity. No spam, no unwanted emails.
        </p>
      </div>
    </section>
  );
};

export default Login;
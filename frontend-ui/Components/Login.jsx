import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../src/config";
import { setDisplayName, setToken } from "../src/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const resetForm = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    resetForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!isLogin && !username.trim()) {
      setError("Username is required.");
      return;
    }
    if (!isLogin && !name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setLoading(true);
      const endpoint = isLogin ? "login" : "register";
      const body = isLogin
        ? { email, password }
        : { name: name.trim(), username: username.trim(), email, password };

      const response = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Authentication failed");
        return;
      }

      setToken(data.token);
      setDisplayName(data.user?.name || data.user?.username || "");
      navigate("/");
    } catch (requestError) {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? "Sign In" : "Register"}</h2>

        <div className="auth-toggle">
          <button
            type="button"
            className={`auth-toggle__btn ${isLogin ? "auth-toggle__btn--active" : ""}`}
            onClick={() => handleModeChange("login")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-toggle__btn ${!isLogin ? "auth-toggle__btn--active" : ""}`}
            onClick={() => handleModeChange("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <label className="auth-label">
              Name
              <input
                className="auth-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}

          {!isLogin && (
            <label className="auth-label">
              Username
              <input
                className="auth-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          )}

          <label className="auth-label">
            Email
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

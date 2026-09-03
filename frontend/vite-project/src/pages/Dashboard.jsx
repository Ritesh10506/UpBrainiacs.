import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { student, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!student) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", padding: "60px 24px", maxWidth: 600, margin: "0 auto" }}>
      <h1>Welcome, {student.full_name || student.email}</h1>
      <p>Email: {student.email}</p>
      <button onClick={handleLogout} style={{ marginTop: 24, padding: "10px 20px", cursor: "pointer" }}>
        Logout
      </button>
      <p style={{ marginTop: 40, color: "#888" }}>
        Your application status and history will appear here soon.
      </p>
    </div>
  );
};

export default Dashboard;
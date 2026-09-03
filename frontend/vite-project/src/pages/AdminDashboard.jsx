import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import UniversitiesPanel from "../components/admin/UniversitiesPanel";
import "./AdminDashboard.css";

const TABS = [
  { id: "universities", label: "Universities" },
  { id: "students", label: "Students" },
  { id: "services", label: "Services" },
  { id: "appointments", label: "Appointments" },
];

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("universities");

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>UpBrainiacs</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "admin-nav-btn active" : "admin-nav-btn"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <p>{admin?.email}</p>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {activeTab === "universities" && <UniversitiesPanel />}
        {activeTab === "students" && <p>Students panel — coming next.</p>}
        {activeTab === "services" && <p>Services panel — coming next.</p>}
        {activeTab === "appointments" && <p>Appointments panel — coming next.</p>}
      </main>
    </div>
  );
};

export default AdminDashboard;
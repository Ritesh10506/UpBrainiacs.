import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import "./AdminPanels.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const emptyForm = {
  name: "",
  image_url: "",
  description: "",
  established: "",
  university_type: "",
  location: "",
  country: "",
  duration: "",
  medium: "",
  recognition: "",
  degree_type: "",
  mbbs_seats: "",
  fees: "",
  scholarships: "",
};

const UniversitiesPanel = () => {
  const { token } = useAdminAuth();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/universities/`);
      if (!res.ok) throw new Error("Failed to load universities");
      setUniversities(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = editingId
        ? `${API_URL}/universities/${editingId}`
        : `${API_URL}/universities/`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Save failed");
      }

      await fetchUniversities();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (uni) => {
    setForm({
      name: uni.name || "",
      image_url: uni.image_url || "",
      description: uni.description || "",
      established: uni.established || "",
      university_type: uni.university_type || "",
      location: uni.location || "",
      country: uni.country || "",
      duration: uni.duration || "",
      medium: uni.medium || "",
      recognition: uni.recognition || "",
      degree_type: uni.degree_type || "",
      mbbs_seats: uni.mbbs_seats || "",
      fees: uni.fees || "",
      scholarships: uni.scholarships || "",
    });
    setEditingId(uni.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this university?")) return;
    setError("");
    try {
      const res = await fetch(`${API_URL}/universities/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchUniversities();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h1>Universities</h1>
        <button
          className="admin-add-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add University
        </button>
      </div>

      {error && <div className="admin-panel-error">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-grid">
            <input name="name" placeholder="University name" value={form.name} onChange={handleChange} required />
            <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
            <input name="established" placeholder="Established (e.g. 1944)" value={form.established} onChange={handleChange} />
            <input name="university_type" placeholder="Type (e.g. Public Medical University)" value={form.university_type} onChange={handleChange} />
            <input name="location" placeholder="Location (e.g. Orenburg, Russia)" value={form.location} onChange={handleChange} />
            <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
            <input name="duration" placeholder="Duration (e.g. 6 Years)" value={form.duration} onChange={handleChange} />
            <input name="medium" placeholder="Medium (e.g. English)" value={form.medium} onChange={handleChange} />
            <input name="recognition" placeholder="Recognition (e.g. NMC, WHO & WDOMS)" value={form.recognition} onChange={handleChange} />
            <input name="degree_type" placeholder="Degree type (e.g. MBBS)" value={form.degree_type} onChange={handleChange} required />
            <input name="mbbs_seats" placeholder="MBBS Seats (e.g. 500)" value={form.mbbs_seats} onChange={handleChange} />
            <input name="fees" placeholder="Tuition Fee (e.g. $5000 / Year)" value={form.fees} onChange={handleChange} required />
            <input name="scholarships" placeholder="Scholarships info" value={form.scholarships} onChange={handleChange} required />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="admin-form-textarea"
          />
          <div className="admin-form-actions">
            <button type="submit">{editingId ? "Update" : "Create"}</button>
            <button type="button" onClick={resetForm} className="admin-cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Degree</th>
              <th>Seats</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((uni) => (
              <tr key={uni.id}>
                <td>{uni.name}</td>
                <td>{uni.location || uni.country}</td>
                <td>{uni.degree_type}</td>
                <td>{uni.mbbs_seats}</td>
                <td>{uni.fees}</td>
                <td className="admin-table-actions">
                  <button onClick={() => handleEdit(uni)}>Edit</button>
                  <button onClick={() => handleDelete(uni.id)} className="admin-delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {universities.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                  No universities yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UniversitiesPanel;
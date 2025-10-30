import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

const baseURL = "http://localhost:5000";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchFilter, setSearchFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const contactsPerPage = 5;

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${baseURL}/contacts`);
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return true; // Email optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[\s-]/g, "");
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(cleanPhone);
  };

  const checkDuplicatePhone = (phone, excludeId = null) => {
    return contacts.some((c) => c.phone === phone && c._id !== excludeId);
  };

  const checkDuplicateEmail = (email, excludeId = null) => {
    if (!email) return false;
    return contacts.some(
      (c) =>
        c.email?.toLowerCase() === email.toLowerCase() && c._id !== excludeId
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number (10–15 digits)";
    } else if (checkDuplicatePhone(phone, editingId)) {
      newErrors.phone = "This phone number already exists";
    }

    if (email && !validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (checkDuplicateEmail(email, editingId)) {
      newErrors.email = "This email already exists";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("phone", phone.trim());
    formData.append("email", email.trim());
    if (profile) formData.append("profile", profile);

    try {
      if (editingId) {
        await axios.patch(`${baseURL}/contacts/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await axios.post(`${baseURL}/contacts`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setName("");
      setPhone("");
      setEmail("");
      setProfile(null);
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchContacts();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error saving contact");
    }
  };

  const handleEdit = (c) => {
    setName(c.name);
    setPhone(c.phone);
    setEmail(c.email || "");
    setEditingId(c._id);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      await axios.delete(`${baseURL}/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleImageClick = (contact) => {
    if (contact.profile) {
      setSelectedImage(`${baseURL}/uploads/${contact.profile}`);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  // Real-time phone restriction 🔒
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // allow only digits
    if (input.length <= 15) {
      setPhone(input);
    }
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) setErrors({ ...errors, name: "" });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: "" });
  };

  const filteredContacts = contacts.filter((c) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();

    switch (searchFilter) {
      case "name":
        return c.name.toLowerCase().includes(term);
      case "phone":
        return c.phone.includes(searchTerm);
      case "email":
        return c.email?.toLowerCase().includes(term);
      case "all":
      default:
        return (
          c.name.toLowerCase().includes(term) ||
          c.phone.includes(searchTerm) ||
          c.email?.toLowerCase().includes(term)
        );
    }
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "phone":
        aValue = a.phone;
        bValue = b.phone;
        break;
      case "email":
        aValue = a.email?.toLowerCase() || "";
        bValue = b.email?.toLowerCase() || "";
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedContacts.length / contactsPerPage);
  const paginatedContacts = sortedContacts.slice(
    (page - 1) * contactsPerPage,
    page * contactsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm, searchFilter, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container">
      <h1>📞 Contact Manager</h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <input
            value={name}
            onChange={handleNameChange}
            placeholder="Name*"
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Phone* (10–15 digits)"
            pattern="\d{10,15}"
            maxLength="15"
            className={errors.phone ? "error-input" : ""}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <input
            value={email}
            onChange={handleEmailChange}
            placeholder="Email (optional)"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setProfile(e.target.files[0])}
          accept="image/*"
        />
        {profile && (
          <img
            src={URL.createObjectURL(profile)}
            alt="Preview"
            width="50"
            style={{ marginTop: "10px", borderRadius: "50%" }}
          />
        )}
        <button type="submit">
          {editingId ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      {/* Search + Sorting Controls */}
      <div
        className="controls"
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search contacts..."
          style={{ flex: "1", minWidth: "200px" }}
        />

        <select
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="all">All Fields</option>
          <option value="name">Name Only</option>
          <option value="phone">Phone Only</option>
          <option value="email">Email Only</option>
        </select>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="name">Name</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>

          <button
            onClick={toggleSortOrder}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Contact List */}
      <div className="contact-list">
        {paginatedContacts.length === 0 ? (
          <p>No contacts found</p>
        ) : (
          paginatedContacts.map((c) => (
            <div key={c._id} className="card">
              <img
                src={
                  c.profile ? `${baseURL}/uploads/${c.profile}` : "/avatar.png"
                }
                alt={c.name}
                width="50"
                style={{ cursor: c.profile ? "pointer" : "default" }}
                onClick={() => handleImageClick(c)}
                className={c.profile ? "clickable-image" : ""}
              />
              <div>
                <h3>{c.name}</h3>
                <p>{c.phone}</p>
                <p>{c.email}</p>
              </div>
              <button onClick={() => handleEdit(c)}>Edit</button>
              <button onClick={() => handleDelete(c._id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="modal-overlay"
          onClick={handleModalClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <div
            style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "rgba(255, 255, 255, 0.3)",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Full size profile"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <div style={{ marginTop: "10px", textAlign: "center", color: "#666" }}>
        Showing {paginatedContacts.length} of {sortedContacts.length} contacts
        {searchTerm && ` (filtered from ${contacts.length} total)`}
      </div>
    </div>
  );
};

export default App;

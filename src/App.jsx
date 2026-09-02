import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    gadgetName: "",
    category: "",
    manufacturer: "",
    healthRating: "",
    techBrand: "",
    userRole: "",
  });

  const [errors, setErrors] = useState({});

  const categories = ["Smartphone", "Laptop", "Wearable", "Audio"];
  const roles = ["Engineer", "Tester"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let message = "";

    if (!value.trim()) {
      message = "This field is required.";
    }

    if (name === "gadgetName" && value.trim().length > 0 && value.trim().length < 3) {
      message = "Gadget name must be at least 3 characters.";
    }

    if (name === "healthRating" && value !== "") {
      const rating = Number(value);

      if (rating < 1 || rating > 100) {
        message = "Health rating must be between 1 and 100.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));

    return message;
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const value = formData[field];

      if (!value.trim()) {
        newErrors[field] = "This field is required.";
      }

      if (
        field === "gadgetName" &&
        value.trim().length > 0 &&
        value.trim().length < 3
      ) {
        newErrors[field] = "Gadget name must be at least 3 characters.";
      }

      if (field === "healthRating" && value !== "") {
        const rating = Number(value);

        if (rating < 1 || rating > 100) {
          newErrors[field] = "Health rating must be between 1 and 100.";
        }
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    alert("Gadget registered successfully!");

    console.log("Submitted Gadget:", formData);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Tech Gadget Inventory Hub</h1>
        <p className="subtitle">
          Register and manage your technology gadgets
        </p>

        <form onSubmit={handleSubmit} className="gadget-form">

          {/* Gadget Name */}
          <div className="form-group">
            <label>Gadget Name</label>

            <input
              type="text"
              name="gadgetName"
              placeholder="Enter gadget name"
              value={formData.gadgetName}
              onChange={handleChange}
            />

            {errors.gadgetName && (
              <span className="error">{errors.gadgetName}</span>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>

          {/* Manufacturer */}
          <div className="form-group">
            <label>Manufacturer</label>

            <input
              type="text"
              name="manufacturer"
              placeholder="Enter manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />

            {errors.manufacturer && (
              <span className="error">{errors.manufacturer}</span>
            )}
          </div>

          {/* Health Rating */}
          <div className="form-group">
            <label>Health Rating</label>

            <input
              type="number"
              name="healthRating"
              placeholder="1 - 100"
              min="1"
              max="100"
              value={formData.healthRating}
              onChange={handleChange}
            />

            {errors.healthRating && (
              <span className="error">{errors.healthRating}</span>
            )}
          </div>

          {/* Tech Brand */}
          <div className="form-group">
            <label>Tech Brand Name</label>

            <input
              type="text"
              name="techBrand"
              placeholder="Enter tech brand"
              value={formData.techBrand}
              onChange={handleChange}
            />

            {errors.techBrand && (
              <span className="error">{errors.techBrand}</span>
            )}
          </div>

          {/* User Role */}
          <div className="form-group">
            <label>User Role</label>

            <div className="radio-group">
              {roles.map((role) => (
                <label key={role} className="radio-option">
                  <input
                    type="radio"
                    name="userRole"
                    value={role}
                    checked={formData.userRole === role}
                    onChange={handleChange}
                  />

                  {role}
                </label>
              ))}
            </div>

            {errors.userRole && (
              <span className="error">{errors.userRole}</span>
            )}
          </div>

          <button type="submit">
            Register Gadget
          </button>

        </form>
      </div>
    </div>
  );
}

export default App;
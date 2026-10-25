import { useState } from "react";
import { useNavigate } from "react-router";
import { PlusCircle } from "lucide-react";

import "../styles/createTicket.css";

const initialForm = {
  title: "",
  description: "",
  category: "",
  priority: "Medium",
};

function CreateTicket({ addTicket }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Ticket title is required.";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Use at least 5 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Use at least 10 characters.";
    }

    const validCategories = [
      "Hardware",
      "Software",
      "Network",
      "Account",
      "Permissions",
    ];

    const validPriorities = ["Low", "Medium", "High"];

    if (!validCategories.includes(formData.category)) {
      newErrors.category = "Select a valid category.";
    }

    if (!validPriorities.includes(formData.priority)) {
      newErrors.priority = "Select a valid priority.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addTicket({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
    });

    navigate("/tickets");
  }

  return (
    <section className="create-ticket-page">
      <div className="dashboard-heading">
        <h1>Create Ticket</h1>
        <p>Submit a new IT support request.</p>
      </div>

      <div className="ticket-form-card">
        <div className="ticket-form-heading">
          <PlusCircle size={26} />

          <div>
            <h2>New Support Request</h2>
            <p>Fill out the information below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="title">Ticket Title</label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Unable to connect to VPN"
              value={formData.title}
              onChange={handleChange}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
            />

            {errors.title && (
              <span id="title-error" className="form-error">
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>

            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleChange}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />

            {errors.description && (
              <span id="description-error" className="form-error">
                {errors.description}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                aria-invalid={Boolean(errors)}
              >
                <option value="">Select Category</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Network">Network</option>
                <option value="Account">Account</option>
                <option value="Permissions">Permissions</option>
              </select>

              {errors.category && (
                <span id="category-error" className="form-error">
                  {errors.category}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority *</label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                aria-invalid={Boolean(errors.priority)}
                aria-describedby={
                  errors.priority ? "priority-error" : undefined
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              {errors.priority && (
                <span id="priority-error" className="form-error">
                  {errors.priority}
                </span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/tickets")}
            >
              Cancel
            </button>

            <button type="submit" className="submit-button">
              <PlusCircle size={18} />
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateTicket;

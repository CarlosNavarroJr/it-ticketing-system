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

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <h1>Create Ticket</h1>
        <p>Submit a new IT support request.</p>
      </div>

      <div className="dashboard-placeholder">
        <h2>New Support Request</h2>
        <p>The ticket submission form will be implemented in Phase 3</p>
      </div>
    </section>
  );
}

export default CreateTicket;

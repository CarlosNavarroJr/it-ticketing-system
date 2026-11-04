import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Save } from "lucide-react";

import "../styles/ticketDetails.css";

function TicketDetails({ tickets, updateTicket }) {
  const { ticketId } = useParams();

  const ticket = tickets.find((item) => item.id === Number(ticketId));

  if (!ticket) {
    return (
      <section className="ticket-details-page">
        <h1>Ticket not found</h1>
        <p>The requested ticket does not exist.</p>
        <Link to="/tickets">Back to All Tickets</Link>
      </section>
    );
  }

  return (
    <TicketEditor key={ticket.id} ticket={ticket} updateTicket={updateTicket} />
  );
}

function TicketEditor({ ticket, updateTicket }) {
  const [formData, setFormData] = useState({
    status: ticket.status,
    priority: ticket.priority,
    assignedTo: ticket.assignedTo,
  });

  const [saved, setSaved] = useState(false);

  const hasChanges =
    formData.status !== ticket.status ||
    formData.priority !== ticket.priority ||
    formData.assignedTo !== ticket.assignedTo;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!hasChanges) return;

    updateTicket(ticket.id, formData);
    setSaved(true);
  }

  return (
    <section className="ticket-details-page">
      <Link to="/tickets" className="details-back-link">
        <ArrowLeft size={18} />
        Back to All Tickets
      </Link>

      <div className="details-heading">
        <p className="details-ticket-id">Ticket #{ticket.id}</p>

        <h1>{ticket.title}</h1>

        <span className="details-current-status">
          Current Status: {ticket.status}
        </span>
      </div>

      <div className="details-card">
        <h2>Issue Description</h2>
        <p className="details-description">{ticket.description}</p>

        <div className="details-divider" />

        <h2>Ticket Information</h2>

        <div className="details-info-grid">
          <div>
            <span className="details-label">Category</span>
            <strong>{ticket.category}</strong>
          </div>

          <div>
            <span className="details-label">Ticket ID</span>
            <strong>#{ticket.id}</strong>
          </div>
        </div>
      </div>

      <form className="details-card details-edit-form" onSubmit={handleSubmit}>
        <h2>Manage Ticket</h2>

        <div className="details-form-grid">
          <div className="details-form-group">
            <label htmlFor="ticket-status">Status</label>

            <select
              id="ticket-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="details-form-group">
            <label htmlFor="ticket-priority">Priority</label>

            <select
              id="ticket-priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="details-form-group">
            <label htmlFor="ticket-assignee">Assigned Technician</label>

            <select
              id="ticket-assignee"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
            >
              <option value="Unassigned">Unassigned</option>
              <option value="Carlos">Carlos</option>
              <option value="Alex">Alex</option>
            </select>
          </div>
        </div>

        <div className="details-actions">
          {saved && !hasChanges && (
            <p className="details-success" role="status">
              Ticket updated successfully.
            </p>
          )}

          <button
            type="submit"
            className="details-save-button"
            disabled={!hasChanges}
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}

export default TicketDetails;

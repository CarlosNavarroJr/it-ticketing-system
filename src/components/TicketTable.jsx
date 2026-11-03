import { Link } from "react-router";

function TicketTable({ tickets }) {
  return (
    <div className="ticket-table-wrapper">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Issue</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>#{ticket.id}</td>

              <td className="ticket-title">
                <Link to={`/tickets/${ticket.id}`} className="ticket-link">
                  {ticket.title}
                </Link>
              </td>

              <td>{ticket.category}</td>
              <td>
                <span
                  className={`badge priority-${ticket.priority.toLowerCase()}`}
                >
                  {ticket.status}
                </span>
              </td>

              <td>
                <span
                  className={`badge status-${ticket.status.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {ticket.status}
                </span>
              </td>
              <td>{ticket.assignedTo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {tickets.length === 0 && (
        <p className="empty-state">No tickets match your search or filters.</p>
      )}
    </div>
  );
}

export default TicketTable;

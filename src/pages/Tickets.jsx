import TicketTable from "../components/TicketTable.jsx";

import "../styles/dashboard.css";

function Tickets({ tickets }) {
  return (
    <section className="tickets-page">
      <div className="dashboard-heading">
        <h1>All Tickets</h1>
        <p>View all IT support requests in the system.</p>
      </div>

      <section className="tickets-count">
        <div className="tickets-header">
          <div>
            <h2>Ticket Management</h2>
            <p>All submitted support requests.</p>
          </div>

          <span className="ticket-count">{tickets.length} Tickets</span>
        </div>

        <TicketTable tickets={tickets} />
      </section>
    </section>
  );
}

export default Tickets;

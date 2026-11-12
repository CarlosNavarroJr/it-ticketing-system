function TicketActivity({ activity = [] }) {
  const labels = {
    status: "Status",
    priority: "Priority",
    assignedTo: "Assigned Technician",
  };

  const sortedActivity = [...activity].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <section className="details-card">
      <h2>Ticket Activity</h2>

      {sortedActivity.length === 0 ? (
        <p className="activity-empty">No activity has been recorded yet.</p>
      ) : (
        <ol className="activity-list">
          {sortedActivity.map((event) => (
            <li className="activity-item" key={event.id}>
              <div className="activity-content">
                <strong>
                  {event.type === "ticket_created"
                    ? "Ticket Created"
                    : `${labels[event.field] ?? event.field} Changed`}
                </strong>

                {event.type === "ticket_updated" && (
                  <p>
                    {event.oldValue} → {event.newValue}
                  </p>
                )}

                <span className="activity-meta">
                  {event.actor} ·{" "}
                  <time dateTime={event.createdAt}>
                    {new Date(event.createdAt).toLocaleString()}
                  </time>
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default TicketActivity;

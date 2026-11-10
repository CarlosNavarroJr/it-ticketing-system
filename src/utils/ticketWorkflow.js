export const TICKET_STATUSES = ["Open", "In Progress", "Resolved"];

export const TICKET_PRIORITIES = ["Low", "Medium", "High"];

export const TECHNICIANS = ["Unassigned", "Carlos", "Alex"];

export const STATUS_TRANSITIONS = {
  Open: ["In Progress"],
  "In Progress": ["Open", "Resolved"],
  Resolved: ["Open"],
};

export function validateTicketUpdate(ticket, updates) {
  const nextStatus = updates.status ?? ticket.status;
  const nextPriority = updates.priority ?? ticket.priority;
  const nextAssignee = updates.assignedTo ?? ticket.assignedTo;

  if (!TICKET_STATUSES.includes(nextStatus)) {
    return "Invalid ticket status.";
  }

  if (!TICKET_PRIORITIES.includes(nextPriority)) {
    return "Invalid ticket priority.";
  }

  if (!TECHNICIANS.includes(nextAssignee)) {
    return "Invalid technician assignment.";
  }

  if (nextStatus !== ticket.status) {
    const allowed = STATUS_TRANSITIONS[ticket.status] ?? [];

    if (!allowed.includes(nextStatus)) {
      return `Cannot move directly from ${ticket.status} to ${nextStatus}.`;
    }
  }

  if (nextStatus === "In Progress" && nextAssignee === "Unassigned") {
    return "Assign a technician before starting work.";
  }

  return null;
}

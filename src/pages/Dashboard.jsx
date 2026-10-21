import { useState } from "react";
import { Ticket, CircleAlert, Clock3, CircleCheck, Search } from "lucide-react";

import StatCard from "../components/StatCard";
import TicketTable from "../components/TicketTable";
import { mockTickets } from "../data/mockTickets";

import "../styles/dashboard.css";

function Dashboard() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Calculate tickets statistics
  const totalTickets = mockTickets.length;

  const openTickets = mockTickets.filter(
    (ticket) => ticket.status === "Open",
  ).length;

  const inProgressTickets = mockTickets.filter(
    (ticket) => ticket.status === "In Progress",
  ).length;

  const resolvedTickets = mockTickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;

  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      icon: Ticket,
      color: "#2563eb",
    },
    {
      title: "Open Tickets",
      value: openTickets,
      icon: CircleAlert,
      color: "#ea580c",
    },
    {
      title: "In Progress",
      value: inProgressTickets,
      icon: Clock3,
      color: "#7c3aed",
    },
    {
      title: "Resolved Tickets",
      value: resolvedTickets,
      icon: CircleCheck,
      color: "#16a34a",
    },
  ];

  // Search and filter tickets
  const filteredTickets = mockTickets.filter((ticket) => {
    const search = searchTerm.trim().toLocaleLowerCase();

    const matchesSearch =
      ticket.title.toLowercase().includes(search) ||
      String(ticket.id).includes(search) ||
      ticket.category.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <h1>Dashboard</h1>
        <p>Welcomed to SupportDesk. Here's your IT support overview.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <section className="tickets-section">
        <div className="tickets-header">
          <div>
            <h2>Recent Tickets</h2>
            <p>View and filter IT support requests.</p>
          </div>

          <span className="ticket-count">
            {filteredTickets.length} of {totalTickets} Tickets
          </span>
        </div>

        <div className="ticket-filters">
          <div className="search-box">
            <Search size={20} aria-hidden="true" />

            <input
              type="search"
              placeholder="Search tickets..."
              aria-label="Search tickets"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            aria-label="Filter by priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <TicketTable tickets={filteredTickets} />
      </section>
    </section>
  );
}

export default Dashboard;

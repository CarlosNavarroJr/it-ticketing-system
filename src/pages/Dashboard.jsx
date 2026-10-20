import { Ticket, CircleAlert, Clock3, CircleCheck } from "lucide-react";
import StatCard from "../components/StatCard";
import { mockTickets } from "../data/mockTickets";
import "../styles/dashboard.css";

function Dashboard() {
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

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <h1>Dashboard</h1>
        <p>Welcome to SupportDesk. Here's your IT support overview.</p>
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
    </section>
  );
}

export default Dashboard;

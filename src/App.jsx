import { useState } from "react";
import { Routes, Route } from "react-router";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import TicketDetails from "./pages/TicketDetails";

import { mockTickets } from "./data/mockTickets";

import "./App.css";

function App() {
  const [tickets, setTickets] = useState(mockTickets);

  function addTicket(ticketData) {
    setTickets((currentTickets) => {
      const nexId =
        currentTickets.length > 0
          ? Math.max(...currentTickets.map((t) => t.id)) + 1
          : 1001;

      const newTicket = {
        id: nexId,
        ...ticketData,
        status: "Open",
        assignedTo: "Unassigned",
      };

      return [newTicket, ...currentTickets];
    });
  }

  function updateTicket(ticketId, updates) {
    const allowedStatuses = ["Open", "In Progress", "Resolved"];
    const allowedPriorities = ["Low", "Medium", "High"];
    const allowedAssignees = ["Unassigned", "Carlos", "Alex"];

    const validUpdates = {};

    if (
      updates.status !== undefined &&
      allowedStatuses.includes(updates.status)
    ) {
      validUpdates.status = updates.status;
    }

    if (
      updates.priority !== undefined &&
      allowedPriorities.includes(updates.priority)
    ) {
      validUpdates.priority = updates.priority;
    }

    if (
      updates.assignedTo !== undefined &&
      allowedAssignees.includes(updates.assignedTo)
    ) {
      validUpdates.assignedTo = updates.assignedTo;
    }

    if (Object.keys(validUpdates).length === 0) {
      return;
    }

    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, ...validUpdates } : ticket,
      ),
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard tickets={tickets} />} />
          <Route path="/tickets" element={<Tickets tickets={tickets} />} />
          <Route
            path="/tickets/new"
            element={<CreateTicket addTicket={addTicket} />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/tickets/:ticketId"
            element={
              <TicketDetails tickets={tickets} updateTicket={updateTicket} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;

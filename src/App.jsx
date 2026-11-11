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
import { validateTicketUpdate } from "./utils/ticketWorkflow";

import { mockTickets } from "./data/mockTickets";

import "./App.css";

function App() {
  const [tickets, setTickets] = useState(mockTickets);

  function addTicket(ticketData) {
    setTickets((currentTickets) => {
      const nextId =
        currentTickets.length > 0
          ? Math.max(...currentTickets.map((t) => t.id)) + 1
          : 1001;

      const timestamp = new Date().toISOString();

      const newTicket = {
        id: nextId,
        ...ticketData,
        status: "Open",
        assignedTo: "Unassigned",
        createdAt: timestamp,
        updatedAt: timestamp,
        activity: [
          {
            id: crypto.randomUUID(),
            type: "ticket_created",
            field: null,
            oldValue: null,
            newValue: null,
            actor: "Demo User",
            createdAt: timestamp,
          },
        ],
      };

      return [newTicket, ...currentTickets];
    });
  }

  function updateTicket(ticketId, updates) {
    const currentTicket = tickets.find((ticket) => ticket.id === ticketId);

    if (!currentTicket) {
      return "Ticket not found.";
    }

    const error = validateTicketUpdate(currentTicket, updates);

    if (error) {
      return error;
    }

    const fields = ["status", "priority", "assignedTo"];

    const changes = fields
      .filter(
        (field) =>
          updates[field] !== undefined &&
          updates[field] !== currentTicket[field],
      )
      .map((field) => ({
        field,
        oldValue: currentTicket[field],
        newValue: updates[field],
      }));

    if (changes.length === 0) {
      return null;
    }

    const timestamp = new Date().toISOString();

    const activity = changes.map((change) => ({
      id: crypto.randomUUID(),
      type: "ticket_updated",
      field: change.field,
      oldValue: change.oldValue,
      newValue: change.newValue,
      actor: "Demo Technician",
      createdAt: timestamp,
    }));

    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              ...Object.fromEntries(
                changes.map(({ field, newValue }) => [field, newValue]),
              ),
              updatedAt: timestamp,
              activity: [...activity, ...(ticket.activity ?? [])],
            }
          : ticket,
      ),
    );

    return null;
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

import { useState } from "react";
import { Routes, Route } from "react-router";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

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
        </Routes>
      </main>
    </div>
  );
}

export default App;

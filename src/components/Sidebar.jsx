import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Users,
  Settings,
  Headset,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Tickets", icon: Ticket },
    { name: "Create Ticket", icon: PlusCircle },
    { name: "Users", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Headset size={28} />
        <h2>SupportDesk</h2>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className={
                item.name === "Dashboard" ? "nav-item active" : "nav-item"
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;

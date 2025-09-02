import { Home, LayoutDashboard, User, Settings } from "lucide-react";

function Sidebar({ active, setActive }) {
  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="h-5 w-5" /> },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">DashBoard</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
              active === item.id
                ? "bg-gray-600 text-white"
                : "hover:bg-zinc-800 text-zinc-300"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

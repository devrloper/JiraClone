import { useState } from "react";
import {
  Star,
  Clock,
  Grid,
  FolderKanban,
  ClipboardList,
  Plus,
  Boxes,
  Users,
  Menu,
  X,
} from "lucide-react";

function Sidebar({ active, setActive }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuSections = [
    {
      title: "Main",
      items: [
        { id: "home", label: "Home", icon: <Grid className="h-5 w-5" /> },
        { id: "dashboard", label: "Dashboard", icon: <FolderKanban className="h-5 w-5" /> },
        { id: "Members", label: "Members", icon: <Clock className="h-5 w-5" /> },
        { id: "starred", label: "Starred", icon: <Star className="h-5 w-5" /> },
        { id: "apps", label: "Apps", icon: <Grid className="h-5 w-5" /> },
        { id: "plans", label: "Plans", icon: <ClipboardList className="h-5 w-5" /> },
      ],
    },
    {
      title: "Recent",
      items: [
        { id: "jira-clone", label: "Jira clone", icon: <Boxes className="h-5 w-5 " /> },
        { id: "more", label: "More projects", icon: <Plus className="h-5 w-5" /> },
      ],
    },
    {
      title: "Other",
      items: [{ id: "teams", label: "Teams", icon: <Users className="h-5 w-5" /> }],
    },
  ];

  return (
    <>
      {/* Toggle Button - sirf mobile screens pr dikhega */}
      <button
        className="lg:hidden p-2 text-white bg-zinc-800 rounded-md absolute top-2 left-2 z-50"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop - jab sidebar open hoga */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-64 p-4 flex flex-col text-sm z-50 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:block`}
      >
        {/* Close button - sirf mobile screens */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold">Jira Clone</h1>
          <button
            className="lg:hidden p-2 rounded-md text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-6">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-xs text-zinc-400 uppercase">{section.title}</p>
              {section.items.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left hover:bg-zinc-800 ${
                      isActive ? "bg-zinc-800 text-blue-400" : "text-zinc-300"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;

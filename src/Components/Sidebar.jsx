
import {
  Star,
  Clock,
  Grid,
  FolderKanban,
  ClipboardList,
  Plus,
  Boxes,
  Users,
  Settings,
} from "lucide-react";

function Sidebar({ active, setActive }) {
  const menuSections = [
    {
      title: "Main",
      items: [
        { id: "home", label: "Home", icon: <Grid className="h-5 w-5" /> },
        { id: "dashboard", label: "Dashboard", icon: <FolderKanban className="h-5 w-5" /> },
        { id: "recent", label: "Recent", icon: <Clock className="h-5 w-5" /> },
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
      items: [
        { id: "teams", label: "Teams", icon: <Users className="h-5 w-5" /> },
        // { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
      ],
    },
  ];

  return (
    <div className="fixed h-full lg:h-full sm:fixed  top-0 left-0 w-64 p-4 flex flex-col text-sm z-30 bg-zinc-950 border-r border-zinc-800 ">
      <h1 className="text-lg font-bold mb-6">Jira Clone</h1>

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
  );
}

export default Sidebar;

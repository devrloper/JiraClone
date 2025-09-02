import { useState } from "react";
import Board from "../Components/Board";
import Home from "./Home";
import Sidebar from "../Components/Sidebar";
import Profile from "./Profile";
import Contact from "./Contact";
function App() {
  const [active, setActive] = useState("dashboard");
  return (
    <div className="min-h-screen w-full flex bg-zinc-950 text-zinc-100">
      <div className="w-64 shrink-0 flex-min-h-screen bg-zinc-900 border-r border-zinc-800">
        <Sidebar active={active} setActive={setActive} />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 overflow-x-auto">
          
          {active === "home" && <Home />}
          {active === "dashboard" && <Board />}
          {active === "profile" && <Profile />}
          {active === "settings" && <Contact />}
        </main>
      </div>
    </div>
  );
}
export default App;

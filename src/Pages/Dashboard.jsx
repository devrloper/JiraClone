import { useState } from "react";
import Board from "../Components/Board";
import Home from "./Home";
import Sidebar from "../Components/Sidebar";

function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex  text-zinc-100   ">
      {/* Sidebar */}
      <div className="w-64 shrink-0 ">
        <Sidebar active={active} setActive={setActive} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg-h-auto ">
        <main className="flex-1 overflow-auto">
          {active === "home" && <Home />}
          {active === "dashboard" && <Board />}
        </main>
      </div>
    </div>
  );
}

export default App;

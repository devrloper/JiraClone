import { useState } from "react";
import Board from "../Components/Board";
import Home from "./Home";
import Sidebar from "../Components/Sidebar";
import MembersPage from "./Members";

function App() {
  const [active, setActive] = useState("dashboard");

  return (
    < div className="flex  text-zinc-100 bg-black   ">
      {/* Sidebar */}
  
        <Sidebar active={active} setActive={setActive} />
    
      {/* Main Content Area */}
      
        <main className="flex-1 overflow-auto">
          {active === "home" && <Home />}
          {active === "dashboard" && <Board />}
         {active === "Members" && <MembersPage />}

        </main>
    </div>
  );
}

export default App;

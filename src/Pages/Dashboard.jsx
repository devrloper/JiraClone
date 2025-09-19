import { useState,useEffect } from "react";
import Board from "../Components/Board";
import Home from "./Home";
import Sidebar from "../Components/Sidebar";
import MembersPage from "./Members";
import Loader from "../Components/Loader";

function App() {
  
  const [active, setActive] = useState("dashboard");
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3 second tak loader show hoga
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // cleanup
    
  }, []);
   if (loading) {
    return <Loader />; // sirf loader show karega
  }
  return (
    < div className="flex  text-zinc-100 bg-black   ">

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

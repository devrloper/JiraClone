import React from 'react'
import Dashboard from './Pages/Dashboard';
import { Route , Routes } from 'react-router-dom';
import CardDetails from "./Components/DetailCard";
const App = () => {
  return (
    <div>
      
         <Routes>
          <Route path="/" element={<Dashboard />} />
           <Route path="/card/:id" element={<CardDetails />} />

        </Routes>
    </div>
  )
}

export default App

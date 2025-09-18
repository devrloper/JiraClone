import React from 'react'
import Dashboard from './Pages/Dashboard';
import { Route , Routes } from 'react-router-dom';
import CardDetails from "./Components/DetailCard";
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
const App = () => {
  return (
    <div>
      
         <Routes>
          <Route path="/" element={<Dashboard />} />
           <Route path="/card/:id" element={<CardDetails />} />
           <Route path="login" element={<LoginPage/>}/>
            <Route path="Signup" element={<SignupPage/>}/>


        </Routes>
    </div>
  )
}

export default App

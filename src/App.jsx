import React from 'react'
import Dashboard from './Pages/Dashboard';
import { Route , Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
         <Routes>
          <Route path="/" element={<Dashboard />} />
      

        </Routes>
    </div>
  )
}

export default App

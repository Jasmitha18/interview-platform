import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import TechnicalSetup from "./pages/TechnicalSetup";
import Results from "./pages/Results";
import HRInterview from "./pages/HRInterview";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/technical-setup" element={<TechnicalSetup />} />
        <Route path="/results" element={<Results />} />
        <Route path="/hr-interview" element={<HRInterview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
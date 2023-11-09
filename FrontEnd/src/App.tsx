import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Inventory from './pages/Home/Inventory';
import Login from './pages/Home/Login'; // Import your Login component
import Signup from './pages/Home/Signup'; // Import your Signup component
import Navbar from './Navbar';
import Dashboard from './pages/Home/Dashboard';
//import AddProduct from './pages/Home/Addproduct';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Include the Navbar component in your main layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

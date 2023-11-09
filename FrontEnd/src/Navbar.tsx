import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navStyle = {
        listStyle: 'none',
        display: 'flex',
        //padding: 0,
        border: '1px solid #aaa', // Add a border
        padding: '10px', // Add some padding to the Navbar
        backgroundColor: '#111', // Add a background color
      };

  return (
    <nav style={navStyle}>
      <ul style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
        <li style={{ marginRight: '10px' }}>
          <h1><Link to="/">HOME</Link></h1>
        </li>
        <li style={{ marginRight: '10px' }}>
          <h1><Link to="/login">Login</Link></h1>
        </li>
        <li>
          <h1><Link to="/signup">Sign Up</Link></h1>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

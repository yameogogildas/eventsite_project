// frontend/src/Navbar.js
import React from 'react';
import './Navbar.css';
import { FaHome, FaConciergeBell, FaImages, FaPhoneAlt } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Décoration Événementielle</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="#accueil"><FaHome className="icon" /> Accueil</a></li>
        <li><a href="#services"><FaConciergeBell className="icon" /> Nos Services</a></li>
        <li><a href="#galerie"><FaImages className="icon" /> Galerie</a></li>
        <li><a href="#contact"><FaPhoneAlt className="icon" /> Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

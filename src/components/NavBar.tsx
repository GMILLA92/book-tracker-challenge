import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { BsBookmarkStarFill } from 'react-icons/bs';
import './NavBar.css'

const NavBar: React.FC = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container-nav mx-auto flex">
        <Link to="/" className="text-white font-bold text-xl flex items-center">
          <FaHome className="icon-navbar" />
        </Link>
        <Link to="/saved" className="text-white font-bold text-xl flex items-center tooltip-container">
          <BsBookmarkStarFill className="icon-navbar" /> 
          <span className="tooltip-text">Saved Books</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

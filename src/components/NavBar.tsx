import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { BsBookmarkStarFill } from 'react-icons/bs';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold text-xl flex items-center">
          <FaHome className="mr-2" /> Home
        </Link>
        <Link to="/saved" className="text-white font-bold text-xl flex items-center">
          <BsBookmarkStarFill className="mr-2" /> Saved
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

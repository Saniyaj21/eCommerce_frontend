import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import './header.scss'

const Header = () => {
 
    const [isNavMobile, setIsNavMobile] = useState(false);

    const toggleMenu = () => {
      setIsNavMobile(!isNavMobile);
    };
  
    return (
      <header className={`${isNavMobile ? "fix-to-top" : ""}`}>
        <nav className={`nav ${isNavMobile ? "nav-mobile" : ""}`}>
          <span className="logo">
            <a href="/">
              <span className="logo-text">ECOMMERCE</span>
              {/* <img className="logo-icon" src={dp} alt="saniyaj mallik" /> */}
            </a>
          </span>
          <span onClick={toggleMenu} className={`hamburg ${isNavMobile ? "ham" : ""}`}>
            <div className="span-1 ham-lines"></div>
            <div className="span-2 ham-lines"></div>
            <div className="span-3 ham-lines"></div>
          </span>
          <div className={`menu ${isNavMobile ? "menu-toggle" : ""}`}>
            <ul  className="ul">
              <li className="nav-li"><Link className="nav-a" to={'/search'}>Search</Link></li>
              <li className="nav-li"><Link className="nav-a" to={'/products'}>Products</Link></li>
              <li className="nav-li"><Link className="nav-a" to={'/'}>Cart</Link></li>
              <li className="nav-li"><Link className="nav-a" to={'/'}>Profile</Link></li>
              
            </ul>
          </div>
        </nav>
      </header>
    );
  
}

export default Header
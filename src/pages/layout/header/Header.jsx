import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import AuthHeader from "../../auth/AuthHeader";

const Header = () => {
	const [isNavMobile, setIsNavMobile] = useState(false);

	const toggleMenu = () => {
		setIsNavMobile(!isNavMobile);
	};

	return (
		<header className={`${isNavMobile ? "fix-to-top" : ""}`}>
			<nav className={`nav ${isNavMobile ? "nav-mobile" : ""}`}>
				<span className='logo'>
					<a href='/'>
						<span className='logo-text'>CloudShop</span>
					</a>
				</span>
				<span
					onClick={toggleMenu}
					className={`hamburg ${isNavMobile ? "ham" : ""}`}
				>
					<div className='span-1 ham-lines'></div>
					<div className='span-2 ham-lines'></div>
					<div className='span-3 ham-lines'></div>
				</span>
			</nav>
			<div className={`side-block ${isNavMobile ? "toggle-side-block" : ""}`}>
				<ul className='ul'>
					<Link className='nav-a' to={"/"}>
						<li className='nav-li'>
							{" "}
							<i className='fa-solid fa-house'></i>Home
						</li>
					</Link>
					<Link className='nav-a' to={"/products"}>
						<li className='nav-li'>
							{" "}
							<i className='fa-solid fa-bag-shopping'></i>Products
						</li>
					</Link>
					<Link className='nav-a' to={"/search"}>
						<li className='nav-li'>
							{" "}
							<i className='fa-brands fa-searchengin'></i> Search
						</li>
					</Link>
					<Link className='nav-a' to={"/cart"}>
						<li className='nav-li'>
							<i className='fa-solid fa-cart-shopping'></i>Cart
						</li>
					</Link>
					<Link className='nav-a' to={"/account"}>
						<li className='nav-li'>
							<i className='fa-solid fa-user'></i>Account
						</li>
					</Link>
					<Link className='nav-a' to={"/login"}>
						<li className='nav-li'>
							<AuthHeader />
						</li>
					</Link>
				</ul>
			</div>
		</header>
	);
};

export default Header;

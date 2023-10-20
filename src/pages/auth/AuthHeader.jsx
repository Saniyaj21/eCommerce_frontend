import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../../redux/slices/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./authHead.scss";

const AuthHeader = () => {
	const { user, isAuthenticated, status } = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<>
			{isAuthenticated ? (
				<div className='logout-div' onClick={handleLogout}>
					<i className='fa-solid fa-right-from-bracket'></i> Logout
				</div>
			) : (
				<div className='login-div'>
					<i className='fa-solid fa-right-to-bracket'></i> login
				</div>
			)}
		</>
	);
};

export default AuthHeader;

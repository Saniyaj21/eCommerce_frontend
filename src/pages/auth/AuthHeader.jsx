import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthHeader = () => {
    const { user, isAuthenticated, status } = useSelector(selectUser);
    const dispatch = useDispatch();
	const navigate = useNavigate();

    const handleLogout = () => {
		dispatch(logoutUser());
	};
  
  return (
    <>{isAuthenticated ? <span onClick={handleLogout}>Logout</span> : <span>login</span>}</>
  )
}

export default AuthHeader
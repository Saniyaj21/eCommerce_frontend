import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../../redux/slices/auth";

import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";

const Account = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isAuthenticated, status } = useSelector(selectUser);
	console.log(status);

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	useEffect(() => {
		
		if (isAuthenticated === false) {
			navigate("/login");
		}
	}, [navigate, isAuthenticated, dispatch]);

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<div>
					<button onClick={handleLogout}>logout</button>


				</div>
			)}
		</>
	);
};

export default Account;

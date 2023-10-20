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

	
	useEffect(() => {
		
		if (isAuthenticated === false) {
			toast.success("Log Out Successfull")
			navigate("/login");
		}
	}, [navigate, isAuthenticated, dispatch]);

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<div>
					account


				</div>
			)}
		</>
	);
};

export default Account;

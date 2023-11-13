import React from "react";

import "./allUsers.scss";
import UserCard from "./components/UserCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../layout/MetaData";
import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";
import {
	allUsers,
	deleteUserAdmin,
	selectAdmin,
} from "../../redux/slices/adminSlice";
import SideBar from "./components/SideBar";

// for same css
import "./productList.scss";
import { useNavigate } from "react-router-dom";

const AllUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { allUsersList, status, error, isUpdated } = useSelector(selectAdmin);

	useEffect(() => {
		// Dispatch the fetchProducts action when the component mounts
		dispatch(allUsers());
		if (error) {
			return toast.error(error);
		}
		if (isUpdated) {
			dispatch(allUsers());
			toast.success("")
		}
	}, [dispatch, error, isUpdated]);

	const deleteUser = (id) => {
		dispatch(deleteUserAdmin(id));
	};
	const updateUserHandler = (id) => {
		navigate(`/admin/user/${id}`)
	};

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<div className='dashboard'>
						<div className='dash-sidebar'>
							<SideBar />
						</div>

						<div className='dash-right'>
							<div className='productList-heading'>
								<div>Name</div>
								<div></div>
								<div>Role</div>
								<div>Action</div>
							</div>
							{allUsersList &&
								allUsersList.map((user) => (
									<UserCard
										key={user._id}
										user={user}
										deleteUser={deleteUser}
										updateUserHandler={updateUserHandler}
									/>
								))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default AllUser;

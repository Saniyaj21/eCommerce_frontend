import React, { useState } from "react";

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
    singleUserDetailsAdmin,
    updateUserRoleAdmin,
} from "../../redux/slices/adminSlice";
import SideBar from "./components/SideBar";

// for same css
import "./productList.scss";
import { useNavigate, useParams } from "react-router-dom";



const EditUser = () => {

    
    const dispatch = useDispatch();
	const navigate = useNavigate()
	const { allUsersList, status, error, isUpdated, selectedUser } = useSelector(selectAdmin);
    const params = useParams();
	const { id } = params;
    const [role, setRole] = useState('')

    useEffect(() => {
		// Dispatch the fetchProducts action when the component mounts
		dispatch(singleUserDetailsAdmin({id}));
		if (error) {
			return toast.error(error);
		}
		
	}, [dispatch, error, isUpdated]);


    const updateOrderSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("role", role);
		dispatch(updateUserRoleAdmin({ id, myForm }));
	};

  return (
    <>
			<MetaData title='Confirm Order' />

			<div className='dashboard'>
				<div className='dash-sidebar'>
					<SideBar />
				</div>
				<div className='dash-right'>
					<div className='confirmOrderPage'>
						<div>
							<div className='confirmshippingArea'>
								<h2>User Info</h2>
								<div className='confirmshippingAreaBox'>
									<div>
										<p>Name:</p>
										<span>{selectedUser?.name}</span>
									</div>
									<div>
										<p>Email:</p>
										<span>{selectedUser?.email}</span>
									</div>
									<div>
										<p>Role:</p>
										<span>{selectedUser?.role}</span>
									</div>
									
								</div>
							</div>
							
						</div>
						{/*  */}
						<div>
							<div className='orderSummary'>
								<form
									className='updateOrderForm'
									onSubmit={updateOrderSubmitHandler}
								>
									<h1>Update User Role</h1>

									<div>
										<select onChange={(e) => setRole(e.target.value)}>
											<option value=''>Update Order Status</option>
											{selectedUser?.role === "user" && (
												<option value='admin'>Admin</option>
											)}

											{selectedUser?.role === "admin" && (
												<option value='user'>User</option>
											)}
										</select>
									</div>

									<button id='createProductBtn' type='submit'>
										Update
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
  )
}

export default EditUser
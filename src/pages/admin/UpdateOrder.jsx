import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/auth";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

import { toast } from "react-hot-toast";
import { getSingleOder, selectOrder } from "../../redux/slices/orderSlice";
import "./updateOrder.scss";
import SideBar from "./components/SideBar";
import { selectAdmin, updateOrderAdmin } from "../../redux/slices/adminSlice";

const UpdateOrder = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const { id } = params;

	const { isAuthenticated } = useSelector(selectUser);
	const { singleOrder } = useSelector(selectOrder);
	const { isUpdated } = useSelector(selectAdmin);

	const [status, setStatus] = useState("");

	const updateOrderSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("status", status);
		dispatch(updateOrderAdmin({ id, myForm }));
	};

	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/login");
		}
		dispatch(getSingleOder({ id }));
	}, [isAuthenticated, dispatch, id, navigate, isUpdated]);

	const address = `${singleOrder?.shippingInfo?.address}, ${singleOrder?.shippingInfo?.city}, ${singleOrder?.shippingInfo?.state}, ${singleOrder?.shippingInfo?.pinCode}, ${singleOrder?.shippingInfo?.country}`;

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
								<h2>Shipping Info</h2>
								<div className='confirmshippingAreaBox'>
									<div>
										<p>Name:</p>
										<span>{singleOrder?.user?.name}</span>
									</div>
									<div>
										<p>Phone:</p>
										<span>{singleOrder?.shippingInfo?.phoneNo}</span>
									</div>
									<div>
										<p>Address:</p>
										<span>{address}</span>
									</div>
									<div>
										<p>Status:</p>
										<span>{singleOrder.orderStatus}</span>
									</div>
								</div>
							</div>
							<div className='confirmCartItems'>
								<h2>Ordered Items:</h2>
								<div className='confirmCartItemsContainer'>
									{singleOrder?.orderItems &&
										singleOrder?.orderItems?.map((item) => (
											<div key={item._id}>
												<img src={item.image} alt='Product' />
												<Link to={`/product/${item.product}`}>
													{item.name}
												</Link>{" "}
												<span>
													{item.quantity} X ₹{item.product.price} ={" "}
													<b>₹{item.price * item.quantity}</b>
												</span>
											</div>
										))}
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
									<h1>Process Order</h1>

									<div>
										<select onChange={(e) => setStatus(e.target.value)}>
											<option value=''>Update Order Status</option>
											{singleOrder.orderStatus === "Processing" && (
												<option value='Shipped'>Shipped</option>
											)}

											{singleOrder.orderStatus === "Shipped" && (
												<option value='Delivered'>Delivered</option>
											)}
										</select>
									</div>

									<button id='createProductBtn' type='submit'>
										Process
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateOrder;

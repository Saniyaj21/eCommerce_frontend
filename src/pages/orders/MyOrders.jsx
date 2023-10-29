import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, selectOrder } from "../../redux/slices/orderSlice";
import Loading from "../layout/loading/Loading";
import "./myOrder.scss";
import OrderCard from "./OrderCard";

const MyOrders = () => {
	const dispatch = useDispatch();
	const { orders, status } = useSelector(selectOrder);

	useEffect(() => {
		dispatch(myOrders());
	}, [dispatch]);

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<div className='order-container'>
						<h2>Order History</h2>
					</div>

					{orders && orders?.map((item) => <OrderCard key={item._id} item={item} />)}
				</>
			)}
		</>
	);
};

export default MyOrders;

import {toast} from 'react-hot-toast';
import SideBar from "./components/SideBar";
import AdminOrderCard from "./components/AdminOredrCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrderAdmin, getAllOrdersAdmin, selectAdmin } from "../../redux/slices/adminSlice";
import { useEffect } from "react";

const AllOrders = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { allOrders, status, error, isUpdated } = useSelector(selectAdmin);

	useEffect(() => {
	  dispatch(getAllOrdersAdmin())
	}, [dispatch, isUpdated])
	

	const updateOrder= (id) =>{
		navigate(`/admin/order/${id}`)
	}
	const deleteHandler =(id)=>{
		dispatch(deleteOrderAdmin({id}))
		toast.success("")
	}
	return (
		<div className='dashboard'>
			<div className='dash-sidebar'>
				<SideBar />
			</div>
			<div className='dash-right'>
				<div className='productList-heading'>
					<div>Order</div>
					<div>Status</div>
					<div>Price</div>
					<div>Action</div>
				</div>
				<div>
				{allOrders &&
								allOrders.map((order) => (
									<AdminOrderCard
										key={order._id}
										order={order}
										updateOrder={updateOrder}
										deleteHandler={deleteHandler}
									/>
								))}
					
				</div>
			</div>
		</div>
	);
};

export default AllOrders;

import SideBar from "./components/SideBar";
import "./dashBoard.scss";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allUsers, getAllOrdersAdmin, getAllProductsAdmin, selectAdmin } from "../../redux/slices/adminSlice";
import { Link } from "react-router-dom";

const DashBoard = () => {
	const dispatch = useDispatch();
	const { totalAmount , allOrders, products, allUsersList} = useSelector(selectAdmin);

	useEffect(() => {
		dispatch(getAllOrdersAdmin());
		dispatch(getAllProductsAdmin());
		dispatch(allUsers());
	}, [dispatch]);

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,

		Legend
	);

	const lineState = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "TOTAL AMOUNT",
				backgroundColor: ["tomato"],
				hoverBackgroundColor: ["rgb(197, 72, 49)"],
				data: [0, totalAmount],
			},
		],
	};

	return (
		<div className='dashboard mr-top'>
			<div className='dash-sidebar'>
				<SideBar />
			</div>
			<div className='dash-right'>
				<div className='dash-head'>
					<h2>Dashboard</h2>
					<b>Total Amount : ₹{totalAmount}</b>
				</div>

				<div className='circle-container'>
					<Link to={'/admin/products'}>
						<div>{products.length}</div>
						<p>Products</p>
					</Link>
					<Link to={'/admin/orders'}>
						<div>{allOrders.length}</div>
						<p>Orders</p>
					</Link>
					<Link to={'/admin/users'}>
						<div>{allUsersList.length}</div>
						<p>Users</p>
					</Link>
				</div>
				<div>
					<div className='lineChart'>
						<Line data={lineState} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashBoard;

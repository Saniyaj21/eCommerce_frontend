import SideBar from "./components/SideBar";
import "./dashBoard.scss";
import { Doughnut, Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
} from "chart.js";

const DashBoard = () => {
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
				data: [0, 4000],
			},
		],
	};

	return (
		<div className='dashboard'>
			<div className='dash-sidebar'>
				<SideBar />
			</div>
			<div className='dash-right'>
				<div className='dash-head'>
					<h2>Dashboard</h2>
					<b>Total Amount : 3000</b>
				</div>

				<div className='circle-container'>
					<div>
						<div>12</div>
						<p>Products</p>
					</div>
					<div>
						<div>12</div>
						<p>Orders</p>
					</div>
					<div>
						<div>13</div>
						<p>Users</p>
					</div>
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

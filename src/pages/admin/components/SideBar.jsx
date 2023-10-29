import "./sideBar.scss";
import { Link } from "react-router-dom";

const SideBar = () => {
	return (
		<div className='sidebar'>
			<Link to={"/admin/dashboard"}>
				{" "}
				<div><i className="fa-solid fa-layer-group"></i> Dashboard</div>
			</Link>
			<Link to={"/"}>
				{" "}
				<div> <i className="fa-solid fa-truck-fast"></i> Orders</div>
			</Link>
			<Link to={"/"}>
				{" "}
				<div><i className="fa-solid fa-users"></i> Users</div>
			</Link>
			<Link to={"/"}>
				{" "}
				<div><i className="fa-solid fa-comment"></i> Reviews</div>
			</Link>{" "}
			<div>
				<details>
					<summary><i className="fa-brands fa-shopify"></i>  Product</summary>

					<Link to={"/"}>
						<p><i className="fa-solid fa-list"></i> All</p>
					</Link>

					<Link to={"/"}>
						<p><i className="fa-solid fa-plus"></i> New</p>
					</Link>
				</details>
			</div>
		</div>
	);
};

export default SideBar;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/auth";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";
import "./account.scss";
import toast from "react-hot-toast";

const Account = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isAuthenticated, status, isUpdated } = useSelector(selectUser);


	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/login");
		}
		if (isUpdated) {
			toast.success("Updated");
		}
	}, [navigate, isAuthenticated, dispatch, isUpdated]);

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<div className='profileContainer'>
						<div>
							<img src={user?.avatar?.url} alt={user?.name} />
							<Link to='/account/update'>Edit Profile</Link>
						</div>
						<div>
							<div>
								<h4>Full Name</h4>
								<p>{user?.name}</p>
							</div>
							<div>
								<h4>Email</h4>
								<p>{user?.email}</p>
							</div>
							<div>
								<h4>Joined On</h4>
								<p>{String(user?.createdAt).substr(0, 10)}</p>
							</div>

							<div>
								<Link to='/orders'>My Orders</Link>
								<Link to='/password/update'>Change Password</Link>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Account;

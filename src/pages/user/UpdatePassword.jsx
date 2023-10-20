import { useEffect, useState } from "react";
import "./updateUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updatePassword } from "../../redux/slices/auth";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
	const { user, isAuthenticated, status } = useSelector(selectUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [oldPassword, setoldPassword] = useState("");
	const [newPassword, setnewPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");

	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/login");
		}
		
       
	}, [user, isAuthenticated, navigate, dispatch]);

    const handleSubmit =(e) =>{
        e.preventDefault();
        if(newPassword !== confirmPassword){
            toast.error("Confirm Password not matched!");
        }else{
            dispatch(updatePassword({oldPassword, newPassword, confirmPassword}))
            navigate('/account')
        }
    }

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<div className='update-profile'>
					<form onSubmit={handleSubmit}>
						<h3>Change Password</h3>
						
						<label htmlFor='oldPass'>Old Password</label>
						<input
							id='oldPass'
							type='password'
							// name='name'
                            required
							value={oldPassword}
							onChange={(e) => setoldPassword(e.target.value)}
						/>
						<label htmlFor='newPass'>New Password</label>
						<input
							id='newPass'
							type='password'
							// name='name'
                            required
							value={newPassword}
							onChange={(e) => setnewPassword(e.target.value)}
						/>
						<label htmlFor='confirmPass'>Confirm Password</label>
						<input
							id='confirmPass'
							type='password'
							// name='name'
                            required
							value={confirmPassword}
							onChange={(e) => setconfirmPassword(e.target.value)}
						/>

						
						<div>
							<button type='submit'>Update</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default UpdatePassword;

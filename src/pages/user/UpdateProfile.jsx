import { useEffect, useState } from "react";
import "./updateUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateProfile } from "../../redux/slices/auth";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdateProfile = () => {
	const { user, isAuthenticated, status } = useSelector(selectUser);
	const navigate = useNavigate();
    const dispatch = useDispatch();
	const [userName, setuserName] = useState("");
	const [userEmail, setuserEmail] = useState("");
    const [avatar, setAvatar] = useState("/Profile.png");
	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/login");
		}
		
		setuserName(user?.name);
		setuserEmail(user?.email);
		setAvatar(user?.avatar.url);
	}, [user, isAuthenticated, navigate, dispatch]);

    const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				setAvatar(e.target.result);
			};

			reader.readAsDataURL(file);
		} else {
			console.log("Error happened");
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();

        const myForm = new FormData();

			myForm.set("name", userName);
			myForm.set("email", userEmail);
	
			myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));

        if (status=== "succeeded") {
            navigate("/account")
            
        }
		
	};

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<div className="update-profile">
					<form onSubmit={handleSubmit}>
                        <h3>Update Profile</h3>
                        <div className='image-container'>
									<img src={avatar} alt='' />
								</div>
								<div className='image-input'>
									<input
										className='file-input'
										type='file'
										// required
										onChange={handleFileChange}
									/>
								</div>
                        <label htmlFor="userName">Name</label>
						<input
                        id="userName"
							type='text'
							name='name'
							value={userName}
							onChange={(e) => setuserName(e.target.value)}
						/>

                        <label htmlFor="userEmail">Email</label>
						<input
                        id="userEmail"
							type='email'
							name='email'
							value={userEmail}
							onChange={(e) => setuserEmail(e.target.value)}
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

export default UpdateProfile;

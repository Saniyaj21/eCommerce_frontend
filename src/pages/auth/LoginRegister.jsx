import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, selectUser } from "../../redux/slices/auth";
import "./loginRegister.scss";
import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../index";

const LoginRegister = () => {
	const [option, setOption] = useState(true);
	const [avatar, setAvatar] = useState("/Profile.png");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const { isAuthenticated, error, status } = useSelector(selectUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (isAuthenticated === true) {
			navigate("/account");
		}
	}, [dispatch, isAuthenticated, error, status, navigate]);

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

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginUser({ loginEmail, loginPassword }));
	};
	const handleRegister = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Confirm Password!");
		} else {
			const myForm = new FormData();

			myForm.set("name", userName);
			myForm.set("email", email);
			myForm.set("password", password);
			console.log(userName, email, password);
			myForm.set("avatar", avatar);
			dispatch(registerUser(myForm));
		}
	};

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<div className='auth-btn-group'>
						<div>
							<div
								className={`slider ${
									option ? "slide-register " : "slider-login"
								}`}
							></div>
							<button
								className={`login-btn ${option ? "color-white" : ""}`}
								onClick={() => setOption(true)}
							>
								Login
							</button>
							<button
								className={`register-btn ${option ? "" : "color-white"}`}
								onClick={() => setOption(false)}
							>
								Register
							</button>
						</div>
					</div>
					<div className='auth-container'>
						{/* Login form */}
						<div className={`login ${option ? "block-form" : "hide-form"}`}>
							<form className='form' onSubmit={handleLogin}>
								<div>
									<label htmlFor='user-email'>Email</label>
									<br />
									<input
										type='email'
										required
										id='user-email'
										onChange={(e) => setLoginEmail(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='user-password'>Password</label>
									<br />
									<input
										type='password'
										required
										id='user-password'
										onChange={(e) => setLoginPassword(e.target.value)}
									/>
								</div>
								<div className='action-btn'>
									<button type='submit'>Login</button>
								</div>
								<Link to={"/"} className='link'>
									Forgot Password?
								</Link>
								<br />
								<p onClick={() => setOption(false)}>New To CloudShop?</p>
							</form>
						</div>

						{/* Register form */}
						<div className={`register ${option ? "hide-form" : "block-form"}`}>
							<form
								className='form'
								encType='multipart/form-data'
								onSubmit={handleRegister}
							>
								<div className='image-container'>
									<img src={avatar} alt='' />
								</div>
								<div className='image-input'>
									<input
										className='file-input'
										type='file'
										required
										onChange={handleFileChange}
									/>
								</div>
								<div>
									<label htmlFor='user-name'>Name</label>
									<br />
									<input
										type='text'
										required
										id='user-name'
										onChange={(e) => setUserName(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='user-email2'>Email</label>
									<br />
									<input
										type='email'
										required
										id='user-email2'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='user-password2'>Password</label>
									<br />
									<input
										type='password'
										required
										id='user-password2'
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='user-password-confirm2'>
										Confirm Password
									</label>
									<br />
									<input
										type='password'
										required
										id='user-password-confirm2'
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
								<div className='action-btn'>
									<button type='submit'>Register</button>
								</div>
								<p onClick={() => setOption(true)}>
									Already registered? Login here.
								</p>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default LoginRegister;

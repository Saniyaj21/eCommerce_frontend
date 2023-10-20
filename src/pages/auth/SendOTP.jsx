import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  selectUser, sendOTP } from "../../redux/slices/auth";
import "./loginRegister.scss";
import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";

const SendOTP = () => {
    const [email, setEmail] = useState('');
    const {  isAuthenticated, status, error } = useSelector(selectUser);
	
    
	const dispatch = useDispatch();
	const navigate = useNavigate();

    useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (isAuthenticated === true) {
			navigate("/account");
		}
       
	}, [dispatch, isAuthenticated, status, navigate, error]);
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(sendOTP({email}))
		navigate('/password/reset')
        
    }



  return (
    <>
    {status === "loading" ? (
        <Loading />
    ) : (
        <>
            
            <div className='update-profile'>
					<form onSubmit={handleSubmit}>
						<h3>Send OTP</h3>
						
						<label htmlFor='oldPass'>Enter Registered Email</label>
						<input
							id='oldPass'
							type='email'
							// name='name'
                            required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						
						
						<div>
							<button type='submit'>Send</button>
						</div>
					</form>
				</div>
        </>
    )}
</>
  )
}

export default SendOTP
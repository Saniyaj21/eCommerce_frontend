import { useEffect, useState } from "react";
import "../user/updateUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, selectUser, sendOTP, updatePassword } from "../../redux/slices/auth";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
    const {isAuthenticated, status, error } = useSelector(selectUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [resetPasswordOTP, setresetPasswordOTP] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");

    useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (isAuthenticated === true) {
			navigate("/account");
		}
        // if (status === "succeeded") {
        //     toast.success("Password changed successfully")
        //     navigate('/account')
        // }
	}, [dispatch, isAuthenticated, status, navigate, error]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Confirm Password not matched!");
        }else{

            // working start from here
            dispatch(resetPassword({resetPasswordOTP, password, confirmPassword}))
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
                <h3>Reset Password</h3>
                <p>Please check the spam in your mail for OTP.</p>
                
                <label htmlFor='otp'>Enter OTP</label>
                <input
                    id='otp'
                    type='text'
                    // name='name'
                    required
                    value={resetPasswordOTP}
                    onChange={(e) => setresetPasswordOTP(e.target.value)}
                />
                <label htmlFor='newPass'>New Password</label>
                <input
                    id='newPass'
                    type='password'
                    // name='name'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
  )
}

export default ResetPassword
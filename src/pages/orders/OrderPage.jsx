import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo, selectOrder } from "../../redux/slices/orderSlice";
import MetaData from "../layout/MetaData";
import { Country, State } from "country-state-city";
import "./order.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";

const OrderPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { shippingInfo } = useSelector(selectOrder);
	const [address, setAddress] = useState(shippingInfo?.address);
	const [city, setCity] = useState(shippingInfo?.city);
	const [state, setState] = useState(shippingInfo?.state);
	const [country, setCountry] = useState(shippingInfo?.country);
	const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
	const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);

	const shippingSubmit = (e) => {
		e.preventDefault();

		if (phoneNo.length < 10 || phoneNo.length > 10) {
			toast.error("Phone Number should be 10 digits Long");
			return;
		}
		const data = { address, city, state, country, pinCode, phoneNo };
		dispatch(saveShippingInfo(data));
		navigate("/order/confirm");
	};
	return (
		<>
			{!shippingInfo ? (
				<Loading />
			) : (
				<>
					<MetaData title='Shipping Details' />
					<div className='shippingContainer'>
						<div className='shippingBox'>
							<h2 className='shippingHeading'>Shipping Details</h2>

							<form
								className='shippingForm'
								encType='multipart/form-data'
								onSubmit={shippingSubmit}
							>
								<div>
									<input
										type='text'
										placeholder='Address'
										required
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</div>

								<div>
									<input
										type='text'
										placeholder='City'
										required
										value={city}
										onChange={(e) => setCity(e.target.value)}
									/>
								</div>

								<div>
									<input
										type='number'
										placeholder='Pin Code'
										required
										value={pinCode}
										onChange={(e) => setPinCode(e.target.value)}
									/>
								</div>

								<div>
									<input
										type='number'
										placeholder='Phone Number'
										required
										value={phoneNo}
										onChange={(e) => setPhoneNo(e.target.value)}
										size='10'
									/>
								</div>

								<div>
									<select
										required
										value={country}
										onChange={(e) => setCountry(e.target.value)}
									>
										<option value=''>Country</option>
										{Country &&
											Country.getAllCountries().map((item) => (
												<option key={item.isoCode} value={item.isoCode}>
													{item.name}
												</option>
											))}
									</select>
								</div>

								{country && (
									<div>
										<select
											required
											value={state}
											onChange={(e) => setState(e.target.value)}
										>
											<option value=''>State</option>
											{State &&
												State.getStatesOfCountry(country).map((item) => (
													<option key={item.isoCode} value={item.isoCode}>
														{item.name}
													</option>
												))}
										</select>
									</div>
								)}

								<input
									type='submit'
									value='Continue'
									className='shippingBtn'
									disabled={state ? false : true}
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default OrderPage;

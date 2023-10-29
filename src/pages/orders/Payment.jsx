import React, { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.scss";
import { createOrder, selectOrder } from "../../redux/slices/orderSlice";
import { selectUser } from "../../redux/slices/auth";
import { selectCartItems } from "../../redux/slices/cartSlice";
import { base_url } from "../../index";

// import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const stripe = useStripe();
	const elements = useElements();
	const payBtn = useRef(null);

	const { shippingInfo } = useSelector(selectOrder);
	const { user } = useSelector(selectUser);
	const { cartItems } = useSelector(selectCartItems);

	const paymentData = {
		amount: Math.round(orderInfo.totalPrice * 100),
	};

	const order = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: orderInfo.subtotal,
		taxPrice: orderInfo.tax,
		shippingPrice: orderInfo.shippingCharges,
		totalPrice: orderInfo.totalPrice,
	};
	console.log(order)

	const submitHandler = async (e) => {
		e.preventDefault();

		payBtn.current.disabled = true;

		try {
			const { data } = await axios.post(
				`${base_url}/api/payment/process`,
				paymentData,
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			const client_secret = data.client_secret;

			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(client_secret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.name,
						email: user.email,
						address: {
							line1: shippingInfo.address,
							city: shippingInfo.city,
							state: shippingInfo.state,
							postal_code: shippingInfo.pinCode,
							country: shippingInfo.country,
						},
					},
				},
			});

			if (result.error) {
				payBtn.current.disabled = false;

				toast.error(result.error.message);
			} else {
				if (result.paymentIntent.status === "succeeded") {
					order.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};

					  dispatch(createOrder(order));
					  toast.success("Order placed")

					navigate("/payment/success");
				} else {
					toast.error("There's some issue while processing payment ");
				}
			}
		} catch (error) {
			payBtn.current.disabled = false;
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {}, [dispatch]);

	return (
		<>
			<MetaData title='Payment' />

			<div className='paymentContainer'>
				<form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
					<h2>Card Info</h2>
					<div>
						<CardNumberElement className='paymentInput' />
					</div>
					<div>
						<CardExpiryElement className='paymentInput' />
					</div>
					<div>
						<CardCvcElement className='paymentInput' />
					</div>

					<input
						type='submit'
						value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
						ref={payBtn}
						className='paymentFormBtn'
					/>
				</form>
			</div>
		</>
	);
};

export default Payment;

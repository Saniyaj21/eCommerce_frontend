import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/auth";
import Loading from "../layout/loading/Loading";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

import { toast } from "react-hot-toast";
import { selectCartItems } from "../../redux/slices/cartSlice";
import { selectOrder } from "../../redux/slices/orderSlice";
import './confirmOrder.scss';


const ConfirmOrder = () => {

  const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isAuthenticated, status, isUpdated } = useSelector(selectUser);
  const {shippingInfo} = useSelector(selectOrder);
  const { cartItems } = useSelector(selectCartItems);

  useEffect(() => {
    if (isAuthenticated === false) {
			navigate("/login");
		}
  }, [isAuthenticated])
  


  
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate('/process/payment')
  }



	return (
		<>
			<MetaData title='Confirm Order' />
			
			<div className='confirmOrderPage'>
				<div>
					<div className='confirmshippingArea'>
						<h2>Shipping Info</h2>
						<div className='confirmshippingAreaBox'>
							<div>
								<p>Name:</p>
								<span>{user.name}</span>
							</div>
							<div>
								<p>Phone:</p>
								<span>{shippingInfo.phoneNo}</span>
							</div>
							<div>
								<p>Address:</p>
								<span>{address}</span>
							</div>
						</div>
					</div>
					<div className='confirmCartItems'>
						<h2>Your Cart Items:</h2>
						<div className='confirmCartItemsContainer'>
							{cartItems &&
								cartItems.map((item) => (
									<div key={item.product._id}>
										<img src={item.product.images[0].url} alt='Product' />
										<Link to={`/product/${item.product._id}`}>
											{item.product.name}
										</Link>{" "}
										<span>
											{item.quantity} X ₹{item.product.price} ={" "}
											<b>₹{item.product.price * item.quantity}</b>
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
				{/*  */}
				<div>
					<div className='orderSummary'>
						<h2>Order Summery</h2>
						<div>
							<div>
								<p>Subtotal:</p>
								<span>₹{subtotal}</span>
							</div>
							<div>
								<p>Shipping Charges:</p>
								<span>₹{shippingCharges}</span>
							</div>
							<div>
								<p>GST:</p>
								<span>₹{Math.round(tax)}</span>
							</div>
						</div>

						<div className='orderSummaryTotal'>
							<p>
								<b>Total:</b>
							</p>
							<span>₹{totalPrice}</span>
						</div>

						<button onClick={proceedToPayment}>Proceed To Payment</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOrder;

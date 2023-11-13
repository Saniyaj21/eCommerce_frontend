import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/auth";
import Loading from "../layout/loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import "./cart.scss";
import { toast } from "react-hot-toast";
import {
	getCartItems,
	removeFromCart,
	selectCartItems,
	updateCart,
} from "../../redux/slices/cartSlice";
import CartCard from "./CartCard";
import { getShippingInfo } from "../../redux/slices/orderSlice";

const CartPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector(selectUser);
	const { cartItems, status, isDeleted } = useSelector(selectCartItems);

	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/login");
		}
		dispatch(getCartItems());
		dispatch(getShippingInfo());
	}, [navigate, isAuthenticated, dispatch, isDeleted]);

	const deleteFromCart = (id) => {
		dispatch(removeFromCart(id));
		toast.success("Removed from Cart");
	};
	const saveCart = (id, quantity) => {
		dispatch(updateCart({ id, quantity }));
		toast.success("Quantity Updated");
	};

	const orderHandler =() =>{
		navigate('/order')
	}

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<div className='main-item-container'>
						<h2>In Cart</h2>
						{cartItems?.length < 1 ? (
							<div className='no-items-cart'>
								<p>No Items in cart</p>
								<Link to={"/"} className='no-items-link'>
									View Products
								</Link>
							</div>
						) : (
							""
						)}

						{cartItems &&
							cartItems?.map((item) => (
								<CartCard
									key={item._id}
									item={item}
									deleteFromCart={deleteFromCart}
									saveCart={saveCart}
								/>
							))}
					</div>

					{cartItems?.length < 1 ? (
						""
					) : (
						<div className='second-container'>
							<span>
								Total Price :{" "}
								{`₹${cartItems.reduce(
									(acc, item) => acc + item?.quantity * item?.product?.price,
									0
								)}`}{" "}
							</span>
							<button className='cart-btn' onClick={orderHandler}>
								{" "}
								<i className='fa-solid fa-bag-shopping'></i>
								{`  `} Place Order
							</button>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default CartPage;

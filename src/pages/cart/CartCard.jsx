import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartCard = ({ item, deleteFromCart, saveCart }) => {
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		setQuantity(item.quantity);
	}, [item]);

	const increaseQuantity = () => {
		if (item.product.Stock <= quantity) return;

		const qty = quantity + 1;
		setQuantity(qty);
	};

	const decreaseQuantity = () => {
		if (1 >= quantity) return;

		const qty = quantity - 1;
		setQuantity(qty);
	};

	return (
		<>
			<div className='cartCard'>
				<div className='image-div'>
					<Link className='cart-link' to={`/product/${item?.product._id}`}>
						<img
							className='cart-image'
							src={item?.product.images[0].url}
							alt={item?.product.name}
						/>
					</Link>
				</div>
				<div className='details-div'>
					<p>{item.product.name}</p>
					<span>{`₹${item.product.price * quantity}`}</span>
					<div>
						<div className='detailsBlock-3-1-1'>
							<button onClick={decreaseQuantity}>-</button>
							{`  ${quantity} `}
							<button onClick={increaseQuantity}>+</button>
						</div>
						<button className="cart-btn" onClick={() => deleteFromCart(item._id)}>Remove</button>
						<button className="cart-btn" onClick={() => saveCart(item._id, quantity)}>
							Save Cart
						</button>
					</div>
					<span>{item.product.Stock ? "" : "Out Of Stock"}</span>
				</div>
			</div>
		</>
	);
};

export default CartCard;

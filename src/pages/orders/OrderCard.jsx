import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ item }) => {
	const { shippingInfo } = item;
	const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

	return (
		<div className='order-card'>
			{/* styles in myOrder.scss */}
			<div className='first-div'>
				{item.orderItems.map((product) => {
					return (
						<>
							<div key={product.name} className='product'>
								<div>
									<img src={product.image} alt='product' />
								</div>

								<div>
									<h3>{product.name}</h3>
									<p>Price : ₹{product.price}</p>
									<p>Quantity : {product.quantity}</p>
									<span>Total Price : ₹{product.quantity * product.price}</span>
									<div>
										<Link to={`/product/${product.product}`}>
											<button>View Product</button>
										</Link>
									</div>
								</div>
							</div>
						</>
					);
				})}
			</div>
			<div>Placed at : {item.createdAt.substring(0, 10)}</div>
			<div>Delivered to : {address}</div>
			<div className='second-div'>
				<div className='product-status-div'>Status : {item.orderStatus}</div>
				<div className='order-price-div'>
					Amount(+tax) : ₹{item.totalPrice}{" "}
				</div>
			</div>
		</div>
	);
};

export default OrderCard;

import React from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";

const ProductCard = ({ product }) => {
	return (
		<Link className='productCard' to={`/product/${product._id}`}>
			<img src={product.images[0].url} alt={product.name} />
			<p>{product.name}</p>
			<span>{`₹${product.price}`}</span>
			<div>
				{/* star rating */}
				<div className="rating-div">
					<Rate value={product.ratings} allowHalf disabled /> 
					<span className='productCardSpan'>
						{" "}
						({product.numOfReviews} Reviews)
					</span>
				</div>
			</div>
			
			<span>{product.Stock ? "" : "Out Of Stock"}</span>
		</Link>
	);
};

export default ProductCard;

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductDetails,
	selectProductById,
} from "../../redux/slices/product";

const ProductDetail = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { id } = params;
	const selectedProduct = useSelector(selectProductById);

	let product = selectedProduct?.product;
	console.log(product)

	useEffect(() => {
		// Dispatch the fetchProducts action when the component mounts
		dispatch(fetchProductDetails(id));
	}, [id,dispatch]);

	return (
		<div>
			ProductDetail
			<hr />
			<div>
			<img src={product?.thumbnail} alt={product?.name} />
						<h2>{product?.title}</h2>
						<h4>{product?.brand}</h4>
						<p>Description: {product?.description}</p>
						<p>Stock: {product?.stock}</p>
						<p>Price : {product?.discountPrice}</p>
						<p>
							Total Price: ${product?.price} Discount Percentage :{" "}
							{product?.discountPercentage} %{" "}
						</p>
			</div>
		</div>
	);
};

export default ProductDetail;

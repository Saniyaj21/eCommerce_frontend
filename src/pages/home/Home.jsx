import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../../redux/slices/product";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
	const dispatch = useDispatch();
	const res  = useSelector(selectAllProducts);
	const products = res?.products
	console.log(products);

	useEffect(() => {
		// Dispatch the fetchProducts action when the component mounts
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<div className='App'>
			<h1>Product List Home</h1>
			{products?.map((product) => (
				<div key={product._id} className='product-box'>
					<Link to={`/product-detail/${product._id}`}>
						<img src={product?.images[0].url} alt={product?.name} />
						<h2>{product?.title}</h2>
						<h4>{product?.brand}</h4>
						<p>Description: {product?.description}</p>
						<p>Stock: {product?.stock}</p>
						<p>Price : {product?.discountPrice}</p>
						<p>
							Total Price: ${product?.price} Discount Percentage :{" "}
							{product?.discountPercentage} %{" "}
						</p>
					</Link>
				</div>
			))}
		</div>
	);
};

export default Home;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../../redux/slices/product";
import "./home.scss";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";

const Home = () => {
	const dispatch = useDispatch();
	const res = useSelector(selectAllProducts);

	const products = res?.products.products; // inside products state we are getting products array
	const status = res?.status;
	const error = res?.error;

	useEffect(() => {
		// Dispatch the fetchProducts action when the component mounts
		dispatch(fetchProducts());
		if (error) {
			return toast.error(error);
		}
	}, [dispatch, error]);

	return (
		<>
			<div className='banner'>
				<p>Welcome to Ecommerce</p>
				<h1>FIND AMAZING PRODUCTS BELOW</h1>

				<a href='#container'>
					<button>Shop Now</button>
				</a>
			</div>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<MetaData title='ECOMMERCE' />

					<h2 className='homeHeading'>Featured Products</h2>

					<div className='container' id='container'>
						{products &&
							products?.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>
				</>
			)}
		</>
	);
};

export default Home;

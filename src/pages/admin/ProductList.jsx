import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productList.scss";
import MetaData from "../layout/MetaData";
import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";
import {
	deleteProduct,
	getAllProductsAdmin,
	selectAdmin,
} from "../../redux/slices/adminSlice";
import SideBar from "./components/SideBar";
import ProductListCard from "./components/ProductListCard";
import { useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/product";

const ProductList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { products, status, error, isUpdated } = useSelector(selectAdmin);

	const deleteHandler = (id) => {
		dispatch(deleteProduct({ id }));
	};
	const updateProduct = (id) => {
		
		navigate(`/admin/product/${id}`);
	};

	useEffect(() => {
		// Dispatch the fetchProducts action when the component mounts
		dispatch(getAllProductsAdmin());
		if (error) {
			return toast.error(error);
		}
		if (isUpdated) {
			dispatch(getAllProductsAdmin());
			toast.success();
		}
	}, [dispatch, error, isUpdated]);

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<MetaData title='Admin' />

					<div className='dashboard'>
						<div className='dash-sidebar'>
							<SideBar />
						</div>
						<div className='dash-right'>
							<div className='productList-heading'>
								<div>Name</div>
								<div>Stock</div>
								<div>Price</div>
								<div>Action</div>
							</div>
							{products &&
								products.map((product) => (
									<ProductListCard
										product={product}
										key={product._id}
										deleteHandler={deleteHandler}
										updateProduct={updateProduct}
									/>
								))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ProductList;

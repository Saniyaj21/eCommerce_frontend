import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProductsReviewAdmin,
	productsReviewAdmin,
	selectAdmin,
} from "../../redux/slices/adminSlice";
import AdminReviewCard from "./components/AdminReviewCard";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { fetchProductDetails, selectProductById } from "../../redux/slices/product";

const ProductReviews = () => {
	const dispatch = useDispatch();
	const { productReviews } = useSelector(selectAdmin);
	const { selectedProduct } = useSelector(selectProductById);
	const params = useParams();
	const { id } = params;
	const [productId, setProductId] = useState(id);

	useEffect(() => {
		if (id) {
			dispatch(productsReviewAdmin(productId));
			dispatch(fetchProductDetails(productId))
		}
	}, [dispatch, id, productId]);

	const fetchReviews = (e) => {
		e.preventDefault();
		console.log(productId);
		dispatch(productsReviewAdmin(productId));
		dispatch(fetchProductDetails(productId))
	};

	const deleteReviewHandler = (reviewId) => {
		dispatch(deleteProductsReviewAdmin({ productId, reviewId }));
		toast.success("");
	};

	return (
		<>
			<MetaData title='Confirm Order' />

			<div className='dashboard'>
				<div className='dash-sidebar'>
					<SideBar />
				</div>
				<div className='dash-right'>
					<div>
						{id ? (
							""
						) : (
							<form onSubmit={(e) => fetchReviews(e)}>
								<h3>Search other product's review</h3>
								<input
									type='text'
									onChange={(e) => setProductId(e.target.value)}
								/>
								<button type='submit'>Search</button>
							</form>
						)}
					</div>

					<div>
						<h1>Products Reviews</h1>
						<h3>Product Name : {selectedProduct?.product?.name}</h3>
						{productReviews &&
							productReviews.map((item) => (
								<AdminReviewCard
									key={item._id}
									item={item}
									deleteReviewHandler={deleteReviewHandler}
								/>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductReviews;

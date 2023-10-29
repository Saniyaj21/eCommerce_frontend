import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	createReviews,
	fetchProductDetails,
	selectProductById,
} from "../../redux/slices/product";
import Loading from "../layout/loading/Loading";
import { toast } from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MetaData from "../layout/MetaData";
import "./productDetails.scss";
import ReviewCard from "./ReviewCard";
import { addToCart } from "../../redux/slices/cartSlice";
import { selectUser } from "../../redux/slices/auth";
import { Rate } from "antd";

const ProductDetail = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { id } = params;
	const { selectedProduct, status, error } = useSelector(selectProductById);
	const { isAuthenticated } = useSelector(selectUser);

	let product = selectedProduct?.product;

	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(true);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const increaseQuantity = () => {
		if (product.Stock <= quantity) return;

		const qty = quantity + 1;
		setQuantity(qty);
	};

	const decreaseQuantity = () => {
		if (1 >= quantity) return;

		const qty = quantity - 1;
		setQuantity(qty);
	};

	useEffect(() => {
		// Dispatch the fetchProducts action when the component mounts
		dispatch(fetchProductDetails(id));

		if (error) {
			return toast.error(error);
		}
	}, [id, dispatch, error]);

	const addToCartHandler = () => {
		if (product.Stock < 1) {
			toast.error("Product out of stock");
			return;
		}
		if (!isAuthenticated) {
			toast.error("Login First");
			return;
		}

		const productId = product._id;
		dispatch(addToCart({ productId, quantity }));
		toast.success("Added to Cart");
	};

	const submitReviewToggle = () => {
		setOpen(!open);
		setComment("");
		setRating(0);
	};

	const reviewSubmitHandler = () => {
		const productId = product._id;
		dispatch(createReviews({ productId, rating, comment }));
		dispatch(fetchProductDetails(id));

		setOpen(true);
		setComment("");
		setRating(0);
		toast.success("Review Added");
	};

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<MetaData title={`${product?.name} || ECOMMERCE`} />
					<div className='ProductDetails'>
						<div>
							<Carousel
								infiniteLoop
								autoPlay
								autoReverse
								showStatus={false}
								showArrows={true}
								showThumbs={false}
								interval={3000}
								showIndicators={true}
							>
								{product &&
									product.images?.map((item, i) => (
										<div key={i}>
											<img src={item?.url} alt={product?.name} />
										</div>
									))}
							</Carousel>
						</div>

						{product && (
							<div>
								<div className='detailsBlock-1'>
									<h2>{product.name}</h2>
									<p>Product # {product._id}</p>
								</div>
								<div className='detailsBlock-2'>
									<Rate count={5} value={product.ratings} allowHalf disabled />
									<span className='detailsBlock-2-span'>
										{" "}
										({product.numOfReviews} Reviews)
									</span>
								</div>
								<div className='detailsBlock-3'>
									<h1>{`₹${product.price}`}</h1>
									<div className='detailsBlock-3-1'>
										<div className='detailsBlock-3-1-1'>
											<button onClick={decreaseQuantity}>-</button>
											{/* <input readOnly type='number' value={quantity} /> */}
											{`  ${quantity} `}
											<button onClick={increaseQuantity}>+</button>
										</div>
										<button
											disabled={product.Stock < 1 ? true : false}
											onClick={addToCartHandler}
										>
											Add to Cart
										</button>
									</div>

									<p>
										Status:
										<b
											className={product.Stock < 1 ? "redColor" : "greenColor"}
										>
											{product.Stock < 1 ? "Out Of Stock" : "In Stock"}
										</b>
									</p>
								</div>

								<div className='detailsBlock-4'>
									Description : <p>{product.description}</p>
								</div>

								<button onClick={submitReviewToggle} className='submitReview'>
									Submit Review
								</button>
								{/* <button className='submitReview'>Submit Review</button> */}

								<div
									className={`${
										open ? "hide-submit-review" : "show-submit-review"
									} submit-review-div`}
								>
									<h3>Add a rating and message</h3>
									<div className='submitDialog'>
										<Rate
											count={5}
											value={rating}
											allowHalf
											onChange={(value) => setRating(value)}
											//   disabled
										/>

										<textarea
											className='submitDialogTextArea'
											cols='30'
											rows='5'
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										></textarea>
									</div>
									<div>
										<button onClick={submitReviewToggle}>Cancel</button>
										<button
											onClick={reviewSubmitHandler}
											className='submit-btn'
										>
											Submit
										</button>
									</div>
								</div>
							</div>
						)}
					</div>

					<h3 className='reviewsHeading'>REVIEWS</h3>

					{product && product.reviews[0] ? (
						<div className='reviews'>
							{product.reviews &&
								product?.reviews?.map((review) => (
									<ReviewCard key={review._id} review={review} />
								))}
						</div>
					) : (
						<p className='noReviews'>No Reviews Yet</p>
					)}
				</>
			)}
		</>
	);
};

export default ProductDetail;

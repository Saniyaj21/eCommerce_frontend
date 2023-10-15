import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

const ProductDetail = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { id } = params;
	const { selectedProduct, status, error } = useSelector(selectProductById);

	let product = selectedProduct?.product;

	useEffect(() => {
		// Dispatch the fetchProducts action when the component mounts
		dispatch(fetchProductDetails(id));

		if (error) {
			return toast.error(error);
		}
	}, [id, dispatch, error]);

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
										<div>
											<img src={item?.url}  alt={product?.name}/>
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
									{/* <Rating {...options} /> */}
									<span className='detailsBlock-2-span'>
										{" "}
										({product.numOfReviews} Reviews)
									</span>
								</div>
								<div className='detailsBlock-3'>
									<h1>{`₹${product.price}`}</h1>
									<div className='detailsBlock-3-1'>
										<div className='detailsBlock-3-1-1'>
											<button>-</button>
											{/* <button onClick={decreaseQuantity}>-</button> */}
											{/* <input readOnly type='number' value={quantity} /> */}
											<input readOnly type='number' value={11} />
											<button>+</button>
											{/* <button onClick={increaseQuantity}>+</button> */}
										</div>
										<button
											disabled={product.Stock < 1 ? true : false}
											// onClick={addToCartHandler}
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

								{/* <button onClick={submitReviewToggle} className='submitReview'> */}
								<button className='submitReview'>Submit Review</button>
							</div>
						)}
					</div>

					<h3 className='reviewsHeading'>REVIEWS</h3>

					{/* <Dialog
						aria-labelledby='simple-dialog-title'
						open={open}
						onClose={submitReviewToggle}
					>
						<DialogTitle>Submit Review</DialogTitle>
						<DialogContent className='submitDialog'>
							<Rating
								onChange={(e) => setRating(e.target.value)}
								value={rating}
								size='large'
							/>

							<textarea
								className='submitDialogTextArea'
								cols='30'
								rows='5'
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							></textarea>
						</DialogContent>
						<DialogActions>
							<Button onClick={submitReviewToggle} color='secondary'>
								Cancel
							</Button>
							<Button onClick={reviewSubmitHandler} color='primary'>
								Submit
							</Button>
						</DialogActions>
					</Dialog> */}

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

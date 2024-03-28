import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductsCustom,
	selectAllProducts,
} from "../../redux/slices/product";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import Loading from "../layout/loading/Loading";
import { useEffect, useState } from "react";
import ProductCard from "../home/ProductCard";
import "./product.scss";
import { Rate } from "antd";

const Product = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isOpen, setIsOpen] = useState(false);

	const { keyword } = useParams();
	const dispatch = useDispatch();
	const res = useSelector(selectAllProducts);
	const products = res?.products.products; // inside products state we are getting products array
	const status = res?.status;
	const error = res?.error;
	let productsCount = res?.products.productsCount;
	let resultPerPage = res?.products.resultPerPage;
	let totalPage = productsCount / resultPerPage;



	const handlePrevClick = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextClick = () => {
		if (currentPage < totalPage) {
			setCurrentPage(currentPage + 1);
		}
	};
	const handleToggleFilter = () => {
		setIsOpen(!isOpen);
		
	};

	// price filter
	const [priceRange, setPriceRange] = useState(10000);

	const handlePriceChange = (e) => {
		setPriceRange(e.target.value);
	};
	// rating filter
	const [ratings, setRatings] = useState(0);

	// category filter
	const [category, setCategory] = useState("");
	
	const categories = [
		"Laptop",
		"Footwear",
		"Bottom",
		"Tops",
		"Attire",
		"Camera",
		"SmartPhones",
	];
	
	// const categories = ["smartphones", "laptops", "fragrances"];

	useEffect(() => {
		if (keyword) {
			dispatch(
				fetchProductsCustom({
					keyword,
					currentPage,
					priceRange,
					ratings,
					category,
				})
			);
		} else {
			dispatch(
				fetchProductsCustom({
					keyword: "",
					currentPage,
					priceRange,
					ratings,
					category,
				})
			);
		}

		if (error) {
			return toast.error(error);
		}
	}, [dispatch, error, keyword, currentPage, priceRange, ratings, category]);

	return (
		<>
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<MetaData title={`ECOMMERCE || ${keyword ? keyword : "Products"}`} />

					<h2 className='homeHeading mr-top'>
						{`${keyword ? "Searched" : "All"}`} Products
					</h2>

					<div className='filter-container'>
						<div className='filter-btn-container'>
							<button onClick={() => handleToggleFilter()}>
								{`  ${isOpen ? "Hide Filters" : "Apply Filters"}`}
							</button>
						</div>
						<div
							className={` border-bottom ${
								isOpen ? "open-filter-section" : "hide-filter-section" 
							}`}
						>
							<div className='filter-box'>
								<div className='category-filter-box'>
									<p>Filter by Category</p>
									<div>
										{categories.map((cat, index) => (
											<li key={index} onClick={() => setCategory(cat)}>
												{cat.toUpperCase()}
											</li>
										))}
									</div>
								</div>

								<div className='right-side-filter'>
									{/* PriceFilter  */}
									<div className='price-filter-box'>
										<p>Filter by Price: </p>
										<div>
											<input
												type='range'
												id='priceRange'
												min='0'
												max='100000'
												step='1000'
												value={priceRange}
												onChange={handlePriceChange}
											/>
											<span>{priceRange}</span>
										</div>
									</div>

									<div className='rating-filter-box'>
										<p>Filer by Rating</p>
										<Rate
											value={ratings}
											onChange={(value) => {
												setRatings(value);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='container' id='container'>
						<p>{`${products?.length === 0 ? "No product found" : ""}`}</p>
						{products &&
							products?.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>

					{!keyword && productsCount >= resultPerPage && (
						<div className='page-box'>
							<button className='paginate-btn' onClick={handlePrevClick}>
								PREV
							</button>
							<span>{`${currentPage} of ${Math.ceil(totalPage)} `}</span>
							<button className='paginate-btn' onClick={handleNextClick}>
								NEXT
							</button>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Product;

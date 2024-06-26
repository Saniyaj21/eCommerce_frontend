import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productList.scss";
import MetaData from "../layout/MetaData";
import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";
import { clearAdminState, selectAdmin, updateProduct } from "../../redux/slices/adminSlice";
import SideBar from "./components/SideBar";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router-dom";
import {
	clearError,
	
	fetchProductDetails,
	
	selectProduct,
} from "../../redux/slices/product";

const UpdateProduct = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { id } = params;
	const dispatch = useDispatch();
	const { isUpdated, isProductUpdated } = useSelector(selectAdmin);
	const { selectedProduct, productStatus } = useSelector(selectProduct);

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [Stock, setStock] = useState(0);
	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState(null);
	const [imagesPreview, setImagesPreview] = useState([]);

	const categories = [
		"Laptop",
		"Footwear",
		"Bottom",
		"Tops",
		"Attire",
		"Camera",
		"SmartPhones",
	];

	useEffect(() => {
		setImagesPreview([]);
		setImages([]);
		dispatch(fetchProductDetails(id));

		setName(selectedProduct?.product.name);
		setPrice(selectedProduct?.product.price);
		setDescription(selectedProduct?.product.description);
		setCategory(selectedProduct?.product.category);
		setStock(selectedProduct?.product.Stock);
		setOldImages(selectedProduct?.product.images);
		dispatch(clearError())
	}, [dispatch, id, isUpdated, selectedProduct?.product._id]);

	const updateProductSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("price", price);
		myForm.set("description", description);
		myForm.set("category", category);
		myForm.set("Stock", Stock);

		images.forEach((image) => {
			myForm.append("images", image);
		});

		dispatch(updateProduct({ id, myForm }));
	};
	if (isProductUpdated === true) {
		toast.success("Product updated");
		navigate('/admin/products')
		dispatch(clearAdminState())
	}

	const updaetProductImagesChange = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);
		setImagesPreview([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((old) => [...old, reader.result]);
					setImages((old) => [...old, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	return (
		<>
			{productStatus.productDetails === "loading" ? (
				<Loading />
			) : (
				<>
					<MetaData title='Add New Product' />

					<div className='dashboard'>
						<div className='dash-sidebar'>
							<SideBar />
						</div>
						<div className='dash-right'>
							<h2>Update product form</h2>
							<form onSubmit={updateProductSubmitHandler}>
								<div>
									<label htmlFor='name'>Name:</label>
									<input
										type='text'
										id='name'
										name='name'
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div>
									<label htmlFor='price'>Price:</label>
									<input
										type='number'
										id='price'
										name='price'
										value={price}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='description'>Description:</label>
									<input
										type='text'
										id='description'
										name='description'
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>

								<div>
									<label htmlFor='category'>Category:</label>
									<select
										id='category'
										name='category'
										value={category}
										onChange={(e) => setCategory(e.target.value)}
									>
										<option value=''>Choose Category</option>
										{categories.map((cate) => (
											<option key={cate} value={cate}>
												{cate}
											</option>
										))}
									</select>
								</div>

								<div>
									<label htmlFor='stock'>Stock</label>
									<input
										id='stock'
										type='number'
										required
										value={Stock}
										onChange={(e) => setStock(e.target.value)}
									/>
								</div>

								<div>
									<label htmlFor='category'>Images</label>
									<input
										type='file'
										name='avatar'
										accept='image/*'
										onChange={updaetProductImagesChange}
										multiple
									/>
								</div>
								<div id='createProductFormImage'>
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
										{imagesPreview.length !== 0
											? imagesPreview &&
											  imagesPreview.map((image, index) => (
													<div key={index}>
														<img src={image} alt='Product Preview' />
													</div>
											  ))
											: oldImages &&
											  oldImages.map((image, index) => (
													<div key={index}>
														<img src={image.url} alt='Product Preview' />
													</div>
											  ))}
									</Carousel>
								</div>
								<button type='submit'>Update</button>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default UpdateProduct;

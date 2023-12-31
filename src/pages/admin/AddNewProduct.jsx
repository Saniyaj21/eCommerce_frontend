import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productList.scss";
import MetaData from "../layout/MetaData";
import { toast } from "react-hot-toast";
import Loading from "../layout/loading/Loading";
import { createProductAdmin, selectAdmin } from "../../redux/slices/adminSlice";
import SideBar from "./components/SideBar";
import { Carousel } from "react-responsive-carousel";
import "./addNewProduct.scss";
import { useNavigate } from "react-router-dom";
const AddNewProduct = () => {
	const dispatch = useDispatch();
	const { status } = useSelector(selectAdmin);
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [Stock, setStock] = useState(0);
	const [images, setImages] = useState([]);
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

	// useEffect(() => {

	// }, [dispatch, error]);

	const createProductSubmitHandler = (e) => {
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
		dispatch(createProductAdmin(myForm));
	};

	const createProductImagesChange = (e) => {
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
			{status === "loading" ? (
				<Loading />
			) : (
				<>
					<MetaData title='Add New Product' />

					<div className='dashboard'>
						<div className='dash-sidebar'>
							<SideBar />
						</div>
						<div className='dash-right'>
							<h2>New product form</h2>

							<form onSubmit={createProductSubmitHandler}>
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
									<p style={{color:"red"}}>Upload max 2 images</p>
									<label htmlFor='category'>Images</label>
									<input
										type='file'
										name='avatar'
										accept='image/*'
										onChange={createProductImagesChange}
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
										{imagesPreview &&
											imagesPreview.map((image, index) => (
												<div key={index}>
													<img src={image} alt='Product Preview' />
												</div>
											))}
									</Carousel>
								</div>

								<button className='button-new-product' type='submit'>
									Submit
								</button>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default AddNewProduct;

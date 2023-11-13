import {Link} from "react-router-dom"
const ProductListCard = ({ product, deleteHandler, updateProduct }) => {
	return (
		<div className='productList-card'>
			<div>
                <div>{product.name}</div>
                <div className="productList-id-div">{product._id}</div>
                <div><Link to={`/admin/reviews/${product._id}`}>See Reviews</Link> </div>
            
            </div>
			<div>{product.Stock}</div>
			<div>{`₹${product.price}`}</div>
			<div>
				<span onClick={()=>updateProduct(product._id)} ><i className="fa-solid fa-pen-to-square"></i> {` `}</span>
				<span onClick={()=>deleteHandler(product._id)}><i className="fa-solid fa-trash"></i></span>
			</div>
		</div>
	);
};

export default ProductListCard;

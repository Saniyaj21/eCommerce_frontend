const AdminOrderCard = ({order, updateOrder, deleteHandler}) => {
	return (
		<div className='productList-card'>
			<div>
				<div></div>
				<div className='productList-id-div'>{order._id}</div>
			</div>
			<div>{order.orderStatus}</div>
			<div>{order.totalPrice}</div>
			<div>
			<span onClick={()=>updateOrder(order._id)} ><i className="fa-solid fa-pen-to-square"></i> {` `}</span>
				<span onClick={()=>deleteHandler(order._id)}><i className="fa-solid fa-trash"></i></span>
			</div>
		</div>
	);
};

export default AdminOrderCard;

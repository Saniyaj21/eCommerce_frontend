import { Rate } from "antd";

const AdminReviewCard = ({item, deleteReviewHandler}) => {
  return (
    <div>
        <div>
        User Name : {item.name}
        </div>
        <div>
        Rating : <Rate count={5} value={item.rating} allowHalf disabled />
        </div>
        <div>
        Comment : {item.comment}
        </div>
        <div><button onClick={()=>deleteReviewHandler(item._id)}>Delete <i className="fa-solid fa-trash"></i></button></div>
    </div>
    
  )
}

export default AdminReviewCard
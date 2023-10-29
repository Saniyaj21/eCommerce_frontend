import "./orderSuccess.scss";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
    <h2>Order Placed successfully </h2>
    <Link to="/orders">View Orders</Link>
  </div>
  )
}

export default OrderSuccess
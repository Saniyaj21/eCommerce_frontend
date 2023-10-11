// import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../media/Profile.png";
import {Rate} from 'antd'


const ReviewCard = ({review}) => {

    
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
    {/* star rating */}
      <div className="review-rate-box">
      <Rate 
      count={5}
      value={review.rating}
      allowHalf
      disabled
      />
      </div>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default ReviewCard
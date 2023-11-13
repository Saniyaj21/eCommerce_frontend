import React from 'react'

const UserCard = ({user, deleteUser, updateUserHandler}) => {
  return (
    <div className='productList-card'>
			<div>
                <div>{user.name}</div>
                <div className="productList-id-div">{user?._id}</div>
            
            </div>
			<div></div>
			<div>{user.role}</div>
			
			<div>
				<span ><i onClick={()=>updateUserHandler(user._id)}  className="fa-solid fa-pen-to-square"></i> {` `}</span>
				<span ><i onClick={()=> deleteUser(user._id)} className="fa-solid fa-trash"></i></span>
			</div>
		</div>
  )
}

export default UserCard
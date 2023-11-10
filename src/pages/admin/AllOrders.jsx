import React from 'react'
import SideBar from './components/SideBar'

const AllOrders = () => {
  return (
    <div className='dashboard'>
			<div className='dash-sidebar'>
				<SideBar />
			</div>
			<div className='dash-right'>
				<h2>All Users</h2>
				<div>
					OrderCard
				</div>
			</div>
		</div>
  )
}

export default AllOrders
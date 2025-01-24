import React from 'react'
import { useSelector } from 'react-redux'
import CSDashboad from './chefService/CSDashboad'
import CUDashboard from './chefUnit/CUDashboard'

function Dashboard() {
    const current_user = useSelector((state)=>state.currentUser.value)

  return (
    <>
        {current_user&&(current_user.isChefService && <CSDashboad />)}
        {current_user&&(current_user.isChefUnit && <CUDashboard />)}
    </>
  )
}

export default Dashboard
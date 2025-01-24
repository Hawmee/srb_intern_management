import React from 'react'
import { useSelector } from 'react-redux'
import CSUnits from './chefService/CSUnits'

function Units() {

  const current_user = useSelector((state)=>state.currentUser.value)
  
  
  return (
    <>
      {current_user &&(current_user.isChefService && <CSUnits />)}
    </>
  )
}

export default Units
import React from 'react'
import { useSelector } from 'react-redux'
import PersInternShip from './pc/PersInternShip'
import CUInternShips from './cu/CUInternShips'
import CSInternShips from './cs/CSInternShips'
import { isArrayNotNull } from '../../functions/Functions'
import { current } from '@reduxjs/toolkit'
import { observation_stage } from '../../utils/Observations'

function InternShips() {

  const current_user=useSelector(state=>state.currentUser.value)
  const internships = useSelector(state=>state.stage.value)

  const unite_internship = isArrayNotNull(internships) ? internships.filter(item=>{
    const unite_recent = current_user ? current_user.unite_id : null
    const unite_matching = (Number(item.unite_id) == Number(unite_recent))
    const isAffirmed = (item.observation !== observation_stage.non_affirme) 
    return (unite_matching && isAffirmed)
  }) : null

  console.log(internships)

  return (
    <>
      {(current_user&&(current_user.isChefService))&& <CSInternShips data={internships} /> }
      {(current_user&&(current_user.isChefUnit))&& <CUInternShips data={unite_internship} /> }
      {(current_user&&(current_user.isPersCellule))&& <PersInternShip data={internships}  /> }
    </>
  )
}

export default InternShips
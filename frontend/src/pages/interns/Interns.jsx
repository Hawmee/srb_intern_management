import React from 'react'
import { useSelector } from 'react-redux'
import PersIntern from './pers/PersIntern'
import CS_interns from './CS/CS_interns'

function Interns() {

  const current_user= useSelector(state=>state.currentUser.value)
  const interns = useSelector(state=>state.stagiaire.value)


  console.log(interns)

  return (
    <>
      {(current_user&&(current_user.isPersCellule))&& <PersIntern interns={interns} /> }
      {(current_user&&(current_user.isChefService))&& <CS_interns interns={interns} /> }
    </>
  )
}

export default Interns
import React from 'react'
import PS_demande from './PS/PS_demande'
import { useSelector } from 'react-redux'
import PC_demande from './PC/PC_demande'

function Demande() {
     
    const user = useSelector(state=>state.currentUser.value)
    const demande = useSelector(state=>state.demande.value)

    console.log(demande)

  return (
    <>  
        {user && user.isPersCellule && <PC_demande data={demande} />}
        {user && user.isPersSecretariat && <PS_demande data={demande} /> }
    </>
  )
}

export default Demande
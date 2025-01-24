import React from 'react'
import { useSelector } from 'react-redux'
import CSAttestation from './cs/CSAttestation'
import PersAttestations from './pers/PersAttestations'
import { isArrayNotNull } from '../../functions/Functions'

function Attestation() {

    const current_user = useSelector(state=>state.currentUser.value)
    const attestations = useSelector(state=>state.attestation.value)
    const internships = useSelector(state=>state.stage.value)

    const attestation  = isArrayNotNull(attestations) ? attestations.filter(item=>item.stage.stagiaire ) : []
    const internship = isArrayNotNull(internships) ? internships.filter(item=> item.stagiaire) : []

    console.log(attestations)

  return (
    <>
        {(current_user && current_user.isChefService)&&<CSAttestation data={attestation} />}
        {(current_user && current_user.isPersCellule)&&<PersAttestations data={internship}/>}
    </>
  )
}

export default Attestation
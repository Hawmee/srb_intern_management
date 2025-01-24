import React from 'react'
import { useSelector } from 'react-redux'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'
import axios from 'axios'

function Collected({onCollected , data}) {

    const url = useSelector(state=>state.backendUrl.value)
    const attestation_id = data.attestation.id
    const endpoint = `${url}/attestation/collected/${attestation_id}`
    const submit = async()=>{
        try {
            const collected = await axios.patch(endpoint)
            if(collected){
                notifySuccess()
                onCollected()
            }
        } catch (error) {
            console.log(error);
            notifyError()
        }
    }

  return (
    <>
        <div className='w-[22vw] flex flex-col'>
            <div className='px-4 text-center '>
                <div className='text-lg border-b-2 mb-3 pb-2'>Attestation livrée</div>
            </div>

            <div className='text-lg'>
                Voulez vous vraiment affirmé la livraison de cette attestation ?
            </div>

            <div className='flex flex-row justify-end text-white mt-4'>
                <button className='bg-gray-600 hover:bg-gray-500 rounded-[8px] px-4 py-1 mr-2' onClick={()=>{
                    onCollected()
                }}>Annuler</button>
                <button className='bg-blue-500 hover:bg-blue-600 rounded-[8px] px-4 py-1' onClick={()=>{
                    submit()
                }}>Valider</button>
            </div>
        </div>
    </>
  )
}

export default Collected
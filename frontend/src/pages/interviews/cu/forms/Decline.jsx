import React from 'react'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Decline({data , onDecline}) {

    const url = useSelector(state=>state.backendUrl.value)
    const id = data.id

    const submit = async()=>{
        try {
            const declined = await axios.delete(`${url}/enretient/cancel/${id}`)
            if(declined){
                onDecline()
                notifySuccess()
            }
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }

  return (
    <>
        <div className='flex flex-col min-w-[12vw]'>
            <div className="px-4 text-lg text-center" >
                <div className='border-b-2 pb-2'>Entretien decliné</div>
                <div className='mt-4'>Voulez-vous qnnuler cet entretien ?</div>
                <div className='flex flex-row justify-end mt-6 text-white'>
                    <button className="px-4 py-1 rounded-[8px] bg-gray-600 hover:bg-gray-500 mr-2" onClick={()=>{onDecline()}}>Annuler</button>
                    <button className="px-4 py-1 rounded-[8px] bg-blue-600 hover:bg-blue-700 " onClick={()=>{submit()}}>Valider</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Decline
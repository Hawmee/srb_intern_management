import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'

function Validate({data , onValidate}) {

    const url = useSelector(state=>state.backendUrl.value)
    const id = data.id
    const onSubmit = async()=>{
        try {
            const fournie = await axios.patch(`${url}/attestation/validate/${id}`)
            if(fournie){
                const message= "Action reussite !"
                notifySuccess(message)
                onValidate()
            }
        } catch (error) {
            const message= "Erreur lors de l'operation!"
            notifyError(message)
            onValidate()
        }
    }

  return (
   <>
        <div className='text-lg text-center px-6 mb-3'>
            <div className='border-b-2 border-gray-300 pb-2'>Attestation Fournie</div>
        </div>
        <div className='text-lg '>
                Voulez-vous poursuivre cette action ?
            </div>

            <div className='flex flex-row justify-end text-white mt-6'>
                <button className='bg-gray-700 hover:bg-gray-600 rounded-[8px] px-4 py-[2px] mr-2'
                    onClick={()=>{
                        onValidate()
                    }}
                >Annuler</button>
                <button className='bg-blue-500 hover:bg-blue-600 rounded-[8px] px-4 py-[2px]' onClick={()=>{
                    onSubmit()
                }}>Valider</button>
            </div>

   </>
  )
}

export default Validate
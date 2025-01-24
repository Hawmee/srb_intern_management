import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { entretiens } from '../../../../services/entretiens'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'

function Cancel({ interview , handleCancel }) {
  const id = interview.id

  const submit = async()=>{
    try {
      const canceled = await entretiens.cancel(id)
      if(canceled){
        handleCancel()
        notifySuccess()
      }
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }

  const onSubmit = ()=>{
    submit()
  }

  return (
    <>
      <div className='mb-4 text-[20px]'>Annulation d'un entretient:</div>
      <div className='text-[18px]'>
        Voulez vous vraiment annuler cet entretient ?
      </div>
      <div className='mt-4 flex flex-row justify-end items-center text-white'>
          <button className='mr-2 px-4 py-1 bg-gray-600 rounded-[8px] hover:bg-gray-700' onClick={()=>{handleCancel()}}>Annuler</button>
          <button className='px-4 py-1 bg-red-500 rounded-[8px] hover:bg-red-600' onClick={()=>{onSubmit()}}>Valider</button>
      </div>
    </>
  )
}

export default Cancel
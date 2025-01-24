import React from 'react'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'
import { demande } from '../../../../services/demande'

function Delete({data , onDelete}) {
  const data_id = Number(data.id)

  const submit = async()=>{
    try {
      const deleted = demande.delete(data_id)
      if(deleted){
        notifySuccess()
        onDelete()
      }
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }
  return (
    <>
      <div className=' fl-col w-[20cw]'>
          <div className='text-center px-12 mb-4 text-lg'>
            <div className='under-line'>Suppression de Demande</div>
          </div>

          <div className='text-lg mb-3'>Voulez vous supprimer cet element ?</div>

          <div className='fl-row justify-end mt-3'>
              <button className='btn-cancel mr-2' onClick={onDelete}>Annuler</button>
              <button className='btn-primary ' onClick={submit}>Valider</button>
          </div>

      </div>
    </>
  )
}

export default Delete
import React from 'react'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'
import { unites } from '../../../../services/unites'

function Delete({data , handleDelete}) {

    const onSubmit= async()=>{
        try {
            const unite = await unites.delete(Number(data.id))
            if(unite){
                notifySuccess()
                handleDelete()
            }
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }

  return (
    <div className='text-lg'>
        <div className='text-center'>
            <div>
                Suppression d'Unité
            </div>
            <div className='mt-2'>
                Voulez vous poursuivre cette action ?
            </div>
            <div className='flex justify-end w-full mt-2'>
                <button className='btn-cancel mr-2' onClick={()=>{
                    handleDelete()
                }}>
                    annuler
                </button>
                <button className='btn-primary' onClick={()=>{
                    onSubmit()
                }}>
                    Valider
                </button>
            </div>
        </div>
    </div>
  )
}

export default Delete
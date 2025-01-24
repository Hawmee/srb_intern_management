import React from 'react'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'
import { tache } from '../../../../services/tache'

function Undone({data , onUndone}) {

    const submit = async()=>{
        try {
            const tache_id = data.id
            const tache_undone = tache.undone(tache_id)
            if(tache_undone){
                notifySuccess()
                onUndone()
            }
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }

  return (
    <>
    <div className="flex flex-col min-w-[20vw]">
        <div className="text-center px-16 ">
            <div className="border-b-2 text-lg pb-2 border-gray-300">
                Tache inachevée
            </div>
        </div>
        <div className="text-lg mt-3">
            Voulez vous marquer cette tache comme inachevée ?
        </div>

        <div className="flex flex-row justify-end text-white mt-4">
            <button
                className="bg-gray-600 hover:bg-gray-500 rounded-md px-4 py-1 mr-2"
                onClick={() => {
                    onUndone();
                }}
            >
                Annuler
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-1" 
                onClick={()=>{
                    submit()
                }}
            >
                Valider
            </button>
        </div>
    </div>
</>
  )
}

export default Undone
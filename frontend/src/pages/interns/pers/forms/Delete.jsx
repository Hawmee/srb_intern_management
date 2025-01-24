import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Delete({handle_delete , data}) {

    const url = useSelector(state=>state.backendUrl.value)
    const toastconfig = useSelector(state=>state.toastConfig.value)
    const id = data.id
    

    const submitDelete = async()=>{
        try {
            const deleted = await axios.delete(`${url}/stagiaire/${id}`)
            if(deleted){
                const message = "Action reussite !"
                handle_delete()
                toast.success(message  , toastconfig)
            }
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
    <div>
        <div>Suppression de stagiaire</div>
        <div>
            Voulez vous supprimer ce stagaire ?
        </div>
        <div>
            <button className='bg-red-500 text-white p7-2 px-6 rounded-[8px]'
                onClick={()=>{
                    submitDelete()
                }}
            >
                Supprimer
            </button>
        </div>
    </div>
    </>
  )
}

export default Delete
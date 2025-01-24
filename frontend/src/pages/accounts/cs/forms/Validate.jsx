import React from 'react'

function Validate({submit , onValidate}) {

  return (
    <>
        <div className='flex flex-col '>
            <div>
                <div>Validation de compte</div>
            </div>
            <div className='mt-3 text-lg'>
                Voulez-vous vraiment valider ce compte ? 
            </div>
            <div className='mt-4 flex flex-row justify-end text-white'>
                <button className='px-4 py-1 rounded-md bg-gray-600 hover:bg-gray-500 mr-2' onClick={()=>{onValidate()}}>Annuler</button>
                <button className='px-4 py-1 rounded-md bg-blue-500 hover:bg-blue-600' onClick={()=>{submit()}} > Valider</button>
            </div>
        </div>
    </>
  )
}

export default Validate
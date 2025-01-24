import React from 'react'
import { FormProvider } from 'react-hook-form'
import FileInput from '../../../../components/forms/FileInput'

function Redocs({method , data , onEdit}) {


    const onSubmit = (data)=>{
        console.log(data);
        
    }

  return (
    <>  
        <div className='mb-6 text-center text-lg'>Modification du Rapport de Stage</div>
        <FormProvider {...method} >
            <form onSubmit={method.handleSubmit(onSubmit)}>
                <div className='mb-3 text-base'>
                    <FileInput 
                        label={"Rapport de stage modifié"}
                        name={"book"}
                        validation={{
                            required:"Valeure requise"
                        }}
                        className="p-2 border-gray-300 border-[2px] rounded-[8px]"
                    />
                </div>

                <div className='mt-6 text-white flex flex-row justify-end'>
                    <button className='bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-[8px]'>Valider</button>
                </div>
            </form>
        </FormProvider>
    </>
  )
}

export default Redocs
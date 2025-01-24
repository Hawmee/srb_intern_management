import React from 'react'
import { FormProvider } from 'react-hook-form'
import FileInput from '../../../../components/forms/FileInput'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

function Docs({data , handle_docs , method}) {

    const id = data.id
    const url = useSelector(state=>state.backendUrl.value)
    const toastconfig = useSelector(state=>state.toastConfig.vallue)

    const submit = async(datas)=>{
        const formData = new FormData()
        if (datas.cv_link && datas.cv_link[0]) {
            formData.append("cv_link", datas.cv_link[0]);
        }
        if (datas.lm_link && datas.lm_link[0]) {
            formData.append("lm_link", datas.lm_link[0]);
        }


        try {
            const submited = await axios.patch(
                `${url}/stagiaire/addDocs/${id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (submited){
                // const message = "Action reussite !!"
                // toast.success(message , toastconfig)
                console.log(submited)
            }
        } catch (error) {
            const message = error.response.data.message
            toast.error(message , toastconfig)

        }
    }

    const onSubmit = (data)=>{
        console.log(data)
        submit(data)
    }

  return (
    <>
        <div className="flex flex-col min-w-[25vw]">
            <div className={"mb-9 text-[18px]"}>Documents du Stagiaire</div>
        </div>
        <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)} >
                <div className='mb-6 flex flex-row text-[18px]'>
                    <div className='mr-2 underline underline-offset-4'>Stagaire:</div>
                    <div className=''>{data.nom} {data.prenom}</div>
                </div>
                <div className='mb-3'>
                    <FileInput 
                        label={"CV Numerique"}
                        name={"cv_link"}
                        validation={{ 
                            required:"Valeure requise"
                         }}
                        className="border-[2px] border-gray-300 rounded-[8px] p-2"
                    />
                </div>
                <div className='mb-3'>
                    <FileInput 
                        label={"LM Numerique"}
                        name={"lm_link"}
                        validation={{ 
                            required:"Valeure requise"
                         }}
                         className="border-[2px] border-gray-300 rounded-[8px] p-2"

                    />
                </div>
                <div className='mt-6 text-white flex flex-row justify-end'>
                    <button className='bg-gray-500 py-2 px-6 rounded-[8px] hover:bg-gray-600 mr-2' type='button' onClick={()=>{handle_docs()}}>Annuler</button>
                    <button className='bg-blue-500 py-2 px-6 rounded-[8px] hover:bg-blue-600'>Valider</button>
                </div>
            </form>
        </FormProvider>
    </>
  )
}

export default Docs
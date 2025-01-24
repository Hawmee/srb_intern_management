import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../../../../components/forms/Input'
import DatePicker from '../../../../components/forms/DatePicker'
import FileInput from '../../../../components/forms/FileInput'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { demande } from '../../../../services/demande'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'

function Add({onAdd}) {
    const method = useForm()
    const today = format(new Date() , "yyyy-MM-dd")
    const [isLoading, setIsLoading] = useState(false)

    const submit = async (data)=>{
        setIsLoading(true)
        const formData = new FormData()
        if (data.cv_link && data.cv_link.length > 0) {
            formData.append("cv_link", data.cv_link[0]);
        }
        if (data.lm_link && data.lm_link.length > 0) {
            formData.append("lm_link", data.lm_link[0]);
        }
        const {cv_link , lm_link , ...body} = data
        const demande_data = {
            ...body,
            date_arrive: format(body.date_arrive ,  "yyyy-MM-dd'T'HH:mm:ss.000'Z")
        }

        formData.append('demande_data' , JSON.stringify(demande_data))

        if(formData){
            try {
                const added = await demande.new(formData)
                if(added){
                    onAdd()
                    notifySuccess()
                }
            } catch (error) {
                console.log(error);
                notifyError()               
            } finally {
                setIsLoading(false)
            }
        }
    }

    const onSubmit = (data)=>{
        submit(data)
    }
    return (
    <>
        <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)}>
                <div className='text-center mb-5 text-gray-700 text-lg w-[20vw] px-12'>
                    <div className='border-b-2 border-gray-400 pb-2'>Nouvelle demande</div>
                </div>
                <fieldset disabled={isLoading} className='space-y-3'>
                    <div className='mb-3'>
                        <Input 
                            label={"Numero d'arrivée"}
                            name={'numero'}
                            validation={{
                                required:'valeure requise'
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <DatePicker 
                            label={"date de depot"}
                            name={'date_arrive'}
                            type="date"
                            defaultValue={today}
                            validation={{
                                required:'valeure requise'
                            }}
                            max={today}
                        />
                    </div>
                    <div className='mb-3'>
                        <FileInput
                            label={"CV numerique"}
                            name={'cv_link'}
                            className ='border-[2px] border-gray-300 p-2 rounded-md'
                            validation={{
                                required:'valeure requise'
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <FileInput 
                            label={"LM Numerique"}
                            name={'lm_link'}
                            className ='border-[2px] border-gray-300 p-2 rounded-md'
                            validation={{
                                required:'valeure requise'
                            }}
                        />
                    </div>
                    <div className='mt-4 flex flex-row justify-end text-white space-x-4'>
                        <button 
                            className='bg-gray-500 text-white py-2 px-6 rounded-[8px] disabled:opacity-50' 
                            type='button' 
                            onClick={()=>{onAdd()}}
                            disabled={isLoading}
                        > 
                            Annuler
                        </button>
                        <button 
                            className='bg-blue-500 text-white py-2 px-6 rounded-[8px] disabled:opacity-50 flex items-center space-x-2'
                            disabled={isLoading}
                        > 
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Chargement...</span>
                                </>
                            ) : (
                                'Valider'
                            )}
                        </button>
                    </div>
                </fieldset>
            </form>
        </FormProvider>
    </>
  )
}

export default Add
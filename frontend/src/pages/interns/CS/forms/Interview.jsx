import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import DatePicker from '../../../../components/forms/DatePicker'
import { format, startOfDay } from 'date-fns'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'
import { entretiens } from '../../../../services/entretiens'

function Interview({onInterview , data}) {
    const stagiaire = data
    const method = useForm()
    const today = format(new Date() , "yyyy-MM-dd'T'HH:mm")
    const maxDay = stagiaire.debut_demande ? format(stagiaire.debut_demande , "yyyy-MM-dd'T'HH:mm") : null

    const submit = async(data)=>{
        try {
            const entretien = entretiens.new(data)
            if(entretien){
                notifySuccess()
                onInterview()
            }
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }

    console.log(stagiaire)
    
    const onSubmit = (data)=>{
        const body = {
            stagiaire_id : stagiaire.id,
            date_entretien: format(data.date_entretien , "yyyy-MM-dd'T'HH:mm:ss.000'Z")
        }

        submit(body)
    }

    return (
    <>
        <FormProvider {...method} >
            <form onSubmit={method.handleSubmit(onSubmit)} className='min-w-[20vw]' >
                <div className='mb-6 text-center text-lg px-12'>
                    <div className=' border-b-2 border-gray-300 pb-2 '>Nouvel Entretient</div>
                </div>
                <div className='mb-3 flex flex-row'>
                    <p className='mr-3 underline underline-offset-4 '>Stagiaire :</p>
                    <p className=' inline '>{data.nom}{" "} {data.prenom}</p>
                </div>
                <div className='mb-3'>
                    <DatePicker 
                        label={"Date de l'entretient"}
                        name={"date_entretien"}
                        type="datetime-local"
                        max={maxDay}
                        defaultValue={today}
                    />
                </div>

                <div className='flex flex-row justify-end text-white mt-6 '>
                    <button className='px-4 py-1 rounded-lg bg-gray-500 hover:bg-gray-600 mr-2' type='button' onClick={()=>{
                        onInterview()
                    }}>Annuler</button>
                    <button className='px-4 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 mr-2'>Valider</button>
                </div>
            </form>
        </FormProvider>
    </>
  )
}

export default Interview
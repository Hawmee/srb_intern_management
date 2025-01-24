import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../../../../components/forms/Input'
import TextArea from '../../../../components/forms/TextArea'
import DatePicker from '../../../../components/forms/DatePicker'
import { format, startOfDay } from 'date-fns'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { dateType } from '../../../../functions/Functions'

function Add({onAddTasks , data}) {

  const method = useForm()
  const stage = data
  const today = format(new Date() , "yyyy-MM-dd")
  const url = useSelector(state=>state.backendUrl.value)
  const fin = format(new Date(stage.date_fin) , "yyyy-MM-dd" )

  const minDate = dateType(stage.date_debut)
  const maxDate = dateType(stage.date_fin)


  const submit = async(data)=>{

    const body = {
      ...data,
      stage_id:Number(stage.id),
      date_fin: format( data.date_fin ,"yyyy-MM-dd'T'HH:mm:ss.000'Z")
    }


    try {
      const newtache = await axios.post(`${url}/tache` , body)
      if(newtache){
        notifySuccess()
        onAddTasks()
      }
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }

  const onSubmit = (data)=>{
    submit(data)
  }

  return (
    <>
        <FormProvider {...method}>
                <div className='text-lg text-center px-3 mb-6'>
                  <div className='pb-2 border-b-2 border-gray-300'>Attribution de Tache</div>
                </div>
                <form className='min-w-[20vw]' onSubmit={method.handleSubmit(onSubmit)}>
                  <div className='mb-3'>
                    <Input 
                      label='Nom du Tache'
                      name='nom'
                    />
                  </div>
                  <div className='mb-3'>
                    <TextArea
                      label='Description'
                      name='description'
                    />
                  </div>
                  <div>
                    <DatePicker 
                      label='Date limite'
                      name='date_fin'
                      type="date"
                      min={minDate ? minDate : today}
                      defaultValue={today}
                      max={maxDate}
                    />
                  </div>
                    <div className='text-white flex flex-row justify-end mt-6'>
                        <button className='bg-gray-600 rounded-[8px] px-4 py-1 hover:bg-gray-500 mr-2' type='button' onClick={()=>{
                          onAddTasks()
                        }}>Annuler</button>
                        <button className='bg-blue-600 rounded-[8px] px-4 py-1 hover:bg-blue-700'>Valider</button>
                    </div>
                </form>
        </FormProvider>
    </>
  )
}

export default Add
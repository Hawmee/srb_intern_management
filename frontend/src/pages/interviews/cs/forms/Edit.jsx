import React, { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import DatePicker from '../../../../components/forms/DatePicker'
import { addDays, format, startOfToday } from 'date-fns'
import { formatDate } from '../../../../functions/Functions'
import { entretiens } from '../../../../services/entretiens'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'

function Edit({method , interview , handleEdit}) {
  const id = interview.id
  const {reset} = method
  const today_date = startOfToday()
  const today = format(today_date, "yyyy-MM-dd'T'HH:mm");
  const afterOneDay = format(addDays(today , 1) , "yyyy-MM-dd'T'HH:mm")

  const submit = async(data)=>{
    try {
      const submited = await entretiens.update(Number(id) , data)
      if(submited){
          notifySuccess()
          handleEdit()            
      }
    } catch (error) {
      console.log(error);
      notifyError()
    }
  }

  const onSubmit = (data)=>{
    const body = {
      date_entretien:format(data.date_entretien , "yyyy-MM-dd'T'HH:mm:ss.000'Z")
    }
    
    submit(body)
    
  }

  useEffect(()=>{
    if(interview){
      reset({
        date_entretien:format(formatDate(interview.date_entretien) , "yyyy-MM-dd'T'HH:mm")
      })
    }
  } , [interview])


  return (
    <>
    <div className='flex flex-col min-w-[25vw]'>
        <div className='mb-4 text-[18px]'>
            Modification date d'entretient
        </div>
        <div>
            <FormProvider {...method} >
                <form onSubmit={method.handleSubmit(onSubmit)}>

                    <div className='mb-3'>
                        <DatePicker 
                            label={"Date d'entretient"}
                            name={"date_entretien"}
                            validation={{
                                required: "Valeur requise",
                            }}
                            type="datetime-local"
                            min={afterOneDay}
                        />
                    </div>

                    <div className="flex flex-row justify-end mt-6">
                        <button className='bg-blue-500 text-white px-4 py-1 rounded-[8px] hover:bg-blue-600'>
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    </div>
</>
  )
}

export default Edit
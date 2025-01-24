import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

function Form({onSubmit, children , ...props}) {
    
    const methods = useForm()

  return (
    <>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
                {children}
            </form>
        </FormProvider>
    </>
  )
}

export default Form
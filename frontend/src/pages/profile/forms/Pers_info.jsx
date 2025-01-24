import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../../../components/forms/Input'
import { Redo2 } from 'lucide-react'
import { useSelector } from 'react-redux';
import { isArrayNotNull } from '../../../functions/Functions';
import { account } from '../../../services/account';
import { notifyError, notifySuccess } from '../../../layouts/MereLayout';

function Pers_info({data}) {
  const current_user = useSelector((state) => state.currentUser.value);
  const accounts = useSelector((state) => state.account.value);
  const user = isArrayNotNull(accounts)
      ? current_user&&(accounts.find((item) => Number(item.id) == Number(current_user.id)))
      : current_user;
  const method = useForm()
  const {reset} = method



  const submit = async(data)=>{
    const { unite, id, ...user_data } = user;
    const body = {
        ...user_data,
        ...data,
        nom: (data.nom).toUpperCase()
    };
    try {
        const submited = await account.update(id, body);
        if (submited) {
            notifySuccess();
        }
    } catch (error) {
        console.log(error);
        notifyError();
    }

    reset()
  }

  const onSubmit = (data)=>{
    submit(data)
  }

  const __reset = ()=>{
    if(data){
        reset({
          nom: data.nom,
          prenom: data.prenom,
          email: data.mail
        })
    }
  }

  useEffect(()=>{
    if(data){
      __reset()
    }
  } , [data])

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)} className='w-full'>

          <div className='mb-3 w-[20vw]'>
            <Input 
              name={'nom'} 
              label={"Nom"}  
            />
          </div>
          <div className='mb-3 w-[20vw]'>
            <Input 
              name={'prenom'} 
              label={"Prenoms"}  
            />
          </div>
          <div className='mb-3 w-[20vw]'>
            <Input 
              name={'email'} 
              label={"Email"}  
              type="email"
            />
          </div>

          <div className='mt-6 fl-row justify-end'> 
              <button className='mr-3' type='button' onClick={()=>{__reset()}}><Redo2 /></button>
              <button className='btn-primary'>Enregistrer</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Pers_info
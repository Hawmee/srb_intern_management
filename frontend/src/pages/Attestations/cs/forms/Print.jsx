import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../../../../components/forms/Input'
import { date_d_m_y, today_string } from '../../../../functions/Functions'
import { pdf } from '@react-pdf/renderer'
import AttesationPDF from '../../../../components/Files/AttesationPDF'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'

function Print({data , onPrint}) {
    const method = useForm()
    const {reset} = method
    const [stage , setStage] = useState(null)
    const [stagiaire ,setStagiaire]= useState(null)
    const [division , setDivision] = useState(null)

    const generate = async (data)=>{


        const pdfBlob = await pdf(<AttesationPDF />).toBlob()
        const url_pdf = URL.createObjectURL(pdfBlob)
        
        const printWindow = window.open(url_pdf)
        if(printWindow){
            printWindow.onload = ()=>{
                printWindow.onafterprint = () => printWindow.close();
            }            
        }
        
    }

    const onSubmit = ( data )=>{
        try {
            generate(data)
            const message = "Action reussite !"
            notifySuccess(message)
            onPrint()
        } catch (error) {
            const message = "Erreur lors de l'operation !"
            notifyError(message)
            console.log(error)
        }
    }

    useEffect(()=>{
        if(data){
            const stage = data.stage
            const stagiaire = stage.stagiaire
            const division = stage.unite
            setStage(stage)
            setStagiaire(stagiaire)
            setDivision(division)
            reset({
                nom:`${stagiaire.nom} ${stagiaire.prenom}`,
                theme: stage.theme,
                division: division.nom
            })
        }
    } , [data])
  return (
    <>
        <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)}>
                <div className='text-lg mb-3 text-center p-2'>
                    <div className='border-b-[2px] border-gray-300 pb-2'>Regeneration d'attestation de Stage</div>
                </div>
                <div className='mb-3'>
                    <Input 
                        label="Stagiaire"
                        name={"nom"}
                    />
                </div>

                <div className='mb-3'>
                    <Input 
                        label="Theme"
                        name={"theme"}
                    />
                </div>

                <div className='mb-3'>
                    <Input 
                        label="Division d'acceuil"
                        name={"division"}
                    />
                </div>


                <div className='mt-6 flex flex-row justify-end text-white'>
                    <button className='bg-gray-600 hover:bg-gray-500 rounded-[8px] px-4 py-1 mr-2'
                        type='button'
                        onClick={()=>{
                            onPrint()
                        }}
                    >Annuler</button>
                    <button className='bg-blue-600 hover:bg-blue-700 rounded-[8px] px-4 py-1'>Valider</button>
                </div>  
            </form>
        </FormProvider>
    </>
  )
}

export default Print
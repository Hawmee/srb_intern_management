import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TitleContainer from "../../../../components/containers/TitleContainer";
import Input from "../../../../components/forms/Input";
import DatePicker from "../../../../components/forms/DatePicker";
import { format } from "date-fns";
import FileInput from "../../../../components/forms/FileInput";
import { date_d_m_y, dateType } from "../../../../functions/Functions";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { demande } from "../../../../services/demande";

function Edit({ data, onEdit }) {
   const [documents, setDocuments] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const method = useForm();
   const today = format(new Date(), "yyyy-MM-dd");
   const { reset } = method;
   const stage = {
     id: data.id,
     stage: data,
   }

   const submit = async (datas) => {
       setIsLoading(true);
       const body ={
         ...datas,
         date_arrive: format(datas.date_arrive , "yyyy-MM-dd'T'HH:mm:ss.000'Z")
       }
       const formData = new FormData();
       Object.entries(body).forEach(([key, value]) => {
           formData.append(key, value);
       });

       if (body.cv_lien && body.cv_lien[0]) {
           formData.append("cv_lien", body.cv_lien[0]);
       }
       if (body.lm_lien && body.lm_lien[0]) {
           formData.append("lm_lien", body.lm_lien[0]);
       }

       try {
         const edited = await demande.update(stage.id , formData)
         if(edited){
           notifySuccess()
           onEdit()
         }
       } catch (error) {
         console.log(error)
         notifyError()
       } finally {
         setIsLoading(false);
       }
   };

   const onSubmit = (data) => {
       submit(data);
   };

   const handle_docs = () => {
       setDocuments(!documents);
   };

   useEffect(() => {
       if (data) {
           reset({
               numero: data.numero,
               date_arrive: dateType(data.date_arrive),
           });
       }
   }, [data]);

   return (
       <>
           <FormProvider {...method}>
               <form
                   onSubmit={method.handleSubmit(onSubmit)}
                   className="w-[20vw]"
               >
                   <TitleContainer>Modification de la demande</TitleContainer>
                   <fieldset disabled={isLoading} className='space-y-3'>
                       <div className="mb-3">
                           <Input
                               label={"Numero d'arrivée"}
                               name={"numero"}
                               validation={{
                                   required: "valeure requise",
                               }}
                           />
                       </div>
                       <div className="mb-3">
                           <DatePicker
                               label={"date de depot"}
                               name={"date_arrive"}
                               type="date"
                               defaultValue={today}
                               validation={{
                                   required: "valeure requise",
                               }}
                               max={today}
                           />
                       </div>
                       <div
                           className="mt-2 flex flex-row justify-end items-center text-blue-400 hover:text-blue-500 text-[18px]x cursor-pointer"
                           onClick={() => {
                               handle_docs();
                           }}
                       >
                           {!documents ? (
                               <ChevronDown size={19} />
                           ) : (
                               <ChevronUp size={19} />
                           )}

                           <p type="button" className="ml-1">
                               Modifier les Documents
                           </p>
                       </div>
                       {documents && (
                           <>
                               <div className="mb-3">
                                   <FileInput
                                       label={"CV numerique"}
                                       name={"cv_lien"}
                                       className="border-[2px] border-gray-300 p-2 rounded-md max-w-[20vw]"
                                   />
                               </div>
                               <div className="mb-3">
                                   <FileInput
                                       label={"LM Numerique"}
                                       name={"lm_lien"}
                                       className="border-[2px] border-gray-300 p-2 rounded-md w-[20vw]"
                                   />
                               </div>
                           </>
                       )}

                       <div className='mt-4 flex flex-row justify-end text-white space-x-4'>
                           <button 
                               className='btn-cancel disabled:opacity-50' 
                               type='button' 
                               onClick={() => {
                                   onEdit();
                               }}
                               disabled={isLoading}
                           > 
                               Annuler
                           </button>
                           <button 
                               className='btn-primary disabled:opacity-50 flex items-center space-x-2'
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
   );
}

export default Edit;
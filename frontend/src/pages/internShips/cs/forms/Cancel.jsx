import React from "react";
import { FormProvider } from "react-hook-form";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Cancel({ method, data, handleCancel }) {

    const stage_id = data.id
    const url = useSelector(state=>state.backendUrl.value)
    const conf = useSelector(state=>state.toastConfig.value)

    const submit = async(data)=>{
        const body = {
            motif: data.motif
        }
        try {
            const canceled = await axios.patch(`${url}/stage/invalid/${stage_id}` , body)
            
            if(canceled){
                const message="Action reussite !"
                toast.success(message,conf)
                handleCancel()
            }
        } catch (error) {
            console.log(error);
            const message = "Erreur lors de l'operation !"
            toast.error(message, conf)
        }
    }

    const onSubmit = (data)=>{
        submit(data)
    }

    return (
        <>
            <div className="text-lg text-center mb-4">Stage non valide</div>
            <FormProvider {...method}>
                <form className="min-w-[20vw]" onSubmit={method.handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <TextArea 
                            label={"Motif du non validité du stage"}
                            name={'motif'}
                            validation={{ 
                                required: "Valeure requise"
                             }}
                        />
                    </div>

                    <div className="mt-4 flex flex-row justify-end text-white">
                        <button
                            className="bg-gray-600 px-4 py-1 hover:bg-gray-500 rounded-[8px] mr-3"
                            type="button"
                            onClick={() => {
                                handleCancel()
                            }}
                        >
                            Annuler
                        </button>
                        <button className="bg-blue-500 px-4 py-1 hover:bg-blue-600 rounded-[8px]">
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default Cancel;

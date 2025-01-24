import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import DatePicker from "../../../../components/forms/DatePicker";
import { format, startOfDay } from "date-fns";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import axios from "axios";
import { useSelector } from "react-redux";

function Edit({ onEdit, data }) {
    const method = useForm();
    const {reset} = method;
    const url = useSelector((state) => state.backendUrl.value);
    const task = data 
    const date_fin_recent = format(new Date(task.date_fin) , 'yyyy-MM-dd')
    const fin_stage = format(new Date(task.stage.date_fin) , 'yyyy-MM-dd')

    const submit = async (data) => {
        const body = {
            ...data,
            date_fin: format(data.date_fin, "yyyy-MM-dd'T'HH:mm:ss.000'Z"),
        };

        try {
            const newtache = await axios.patch(`${url}/tache/${task.id}`, body);
            if (newtache) {
                notifySuccess();
                onEdit();
            }
        } catch (error) {
            console.log(error);
            notifyError();
        }

    };

    const onSubmit = (data) => {
        submit(data);
    };


    useEffect(()=>{
      if(data){
        const task = data
        console.log(task)
        const nom = task.nom
        const description = task.description
        reset({
          nom: nom,
          description: description,
        })
      }
    } , [data])

    return (
        <>
            <FormProvider {...method}>
                <div className="text-lg text-center px-3 mb-6">
                    <div className="pb-2 border-b-2 border-gray-300">
                        Attribution de Tache
                    </div>
                </div>
                <form
                    className="min-w-[20vw]"
                    onSubmit={method.handleSubmit(onSubmit)}
                >
                    <div className="mb-3">
                        <Input label="Nom du Tache" name="nom" />
                    </div>
                    <div className="mb-3">
                        <TextArea label="Description" name="description" />
                    </div>
                    <div>
                        <DatePicker
                            label="Date limite"
                            name="date_fin"
                            type="date"
                            min={date_fin_recent}
                            defaultValue={date_fin_recent}
                            max={fin_stage}
                        />
                    </div>
                    <div className="text-white flex flex-row justify-end mt-6">
                        <button
                            className="bg-gray-600 rounded-[8px] px-4 py-1 hover:bg-gray-500 mr-2"
                            type="button"
                            onClick={() => {
                                onEdit();
                            }}
                        >
                            Annuler
                        </button>
                        <button className="bg-blue-600 rounded-[8px] px-4 py-1 hover:bg-blue-700">
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default Edit;

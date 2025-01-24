import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../../components/forms/Input";
import { useSelector } from "react-redux";
import { calcluNote, isArrayNotNull } from "../../../../functions/Functions";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { Stage } from "../../../../services/stage";

const Finish = ({ data, onFinish }) => {
    const methods = useForm({
        mode: "onChange", // This enables real-time validation
        defaultValues: {
            pertinance_pro: "10",
            pertinance_tech: "10",
            pertinance_pedago: "10",
            observation: "Bien"
        }
    });

    const { watch, reset, formState: { isSubmitting, errors } } = methods;

    const stage = data
    const comp_pro = watch('pertinance_pro');
    const pert_tech = watch('pertinance_tech');
    const pert_pedago = watch('pertinance_pedago');
    const [obs, setObs] = useState('Bien');


    const submit = async(data)=>{
        try {
            const body = {
                ...data,
                pertinance_pro: `${data.pertinance_pro}`,
            }
            const stage_id = stage.id
            const finished_stage = await Stage.fin(stage_id , body)
            if(finished_stage){
                notifySuccess()
                onFinish()
            }
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }

    const onSubmit = async (data) => {
        submit(data)
    };

    useEffect(() => {
        const total = Number(comp_pro) + Number(pert_tech) + Number(pert_pedago);
        let newObs = 'Mauvais';
        
        if (total >= 50) newObs = 'Excellent';
        else if (total >= 40) newObs = 'Tres-Bien';
        else if (total >= 30) newObs = 'Bien';
        else if (total >= 20) newObs = 'Assez-Bien';

        setObs(newObs);
        reset({ ...methods.getValues(), observation: newObs });
    }, [comp_pro, pert_tech, pert_pedago]);

    useEffect(()=>{
        if(data){
            const tasks = data.taches
            const note =  isArrayNotNull(tasks) ? calcluNote(tasks) : null

            reset({
                pertinance_pro: note ? note : 10,
            })
        }
    } , [data])

    useEffect(()=>{
        if(data){
            const performance = data.performance ? data.performance : null
            if(performance){
                reset({
                    pertinance_pro: performance.pertinance_pro,
                    pertinance_tech: performance.pertinance_tech,
                    pertinance_pedago: performance.pertinance_pedago,
                })
            }
        }
    } , [data])

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <h2 className="text-lg font-semibold text-center mb-6 px-12">
                <div className=" border-b-2 border-gray-300 pb-2">
                    Finition et Notation du Stage
                </div>
            </h2>
            
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 min-w-[20vw]">

                    <div className="space-y-4">
                        
                        {[
                            { name: 'pertinance_pro', label: 'Comportement professionnel        ' },
                            { name: 'pertinance_tech', label: 'Pertinence technique' },
                            { name: 'pertinance_pedago', label: 'Pertinence pédagogique' }
                        ].map((field) => (
                            <Input
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type="number"
                                validation={{
                                    required: 'Ce champ est requis',
                                    min: { value: 0, message: 'Minimum 0' },
                                    max: { value: 20, message: 'Maximum 20' }
                                }}
                                min={0}
                                max={20}
                                className="w-full"
                            />
                        ))}

                        <Input
                            label="Observation"
                            name="observation"
                            type="text"
                            readOnly
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={()=>{
                                onFinish()
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                            disabled={isSubmitting}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={isSubmitting || Object.keys(errors).length > 0}
                        >
                            {isSubmitting ? 'En cours...' : 'Valider'}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default Finish;
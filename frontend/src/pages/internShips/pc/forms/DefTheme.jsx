import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../../components/forms/Input";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { Stage } from "../../../../services/stage";

function DefTheme({ data, onDefTheme }) {
    const stage_id = Number(data.id);
    const method = useForm();
    const { reset } = method;

    const submit = async(data)=>{
        const body ={
            ...data
        }
        try {
            const modified_theme = await Stage.them_def(stage_id , body)
            if(modified_theme){
                notifySuccess()
                onDefTheme()
            }
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }

    const onSubmit = (data) => {
        submit(data)
    };

    useEffect(() => {
        if (data) {
            reset({
                theme_provisoir: data.theme_provisoir,
                theme_definitif: data.theme_definitif
                    ? data.theme_definitif
                    : data.theme_provisoir,
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
                    <div className="text-center text-lg mb-4 px-12">
                        <div className="border-b-2 border-gray-300 pb-2">
                            Modification de theme
                        </div>
                    </div>

                    <div className="mb-3">
                        <Input
                            label={"Theme Provisoir"}
                            name={"theme_provisoir"}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            label={"Theme definitif"}
                            name={"theme_definitif"}
                        />
                    </div>

                    <div className="flex flex-row justify-end text-white mt-6 ">
                        <button
                            className="px-4 py-1 mr-2 rounded-lg bg-gray-500 hover:bg-gray-600"
                            type="button"
                            onClick={() => {
                                onDefTheme();
                            }}
                        >
                            Annuler
                        </button>
                        <button className="px-4 py-1 rounded-lg bg-blue-500 hover:bg-blue-600">
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default DefTheme;

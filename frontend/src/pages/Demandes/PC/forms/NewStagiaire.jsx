import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../../components/forms/Input";
import DatePicker from "../../../../components/forms/DatePicker";
import { format } from "date-fns";
import { stagiaire } from "../../../../services/stagiaire";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { demande } from "../../../../services/demande";

function NewStagiaire({ data, onStagiaire }) {
    const demand = data
    const method = useForm();
    const required = {
        required: "Valeur requise",
    };

    const today = format(new Date(), "yyyy-MM-dd");

    const submit = async(data)=>{
        const body ={
            ...data,
            nom: (data.nom).toUpperCase(),
            duree: Number(data.duree),
            debut_demande: data.debut_demande ? format(data.debut_demande , "yyyy-MM-dd'T'HH:mm:ss.000'Z") : null,
            cv_lien: demand.cv_lien,
            lm_lien: demand.lm_lien,
        }

        try {
            const added = await stagiaire.new(body)
            const registered = await demande.registered(Number(demand.id))
            if(added){
                onStagiaire()
                notifySuccess()
            }
        } catch (error) {
            console.log(error);
            notifyError()
        }
    }


    const onSubmit = (data) => {
        submit(data)
    };

    return (
        <>
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className="text-lg text-center mb-3 px-12">
                        <div className="border-b-2 border-gray-300 pb-2">
                            Enregistrement de Stagiaire
                        </div>
                    </div>
                    <div className="flex flex-row mb-3">
                        <div className="mr-3">
                            <Input
                                name={"nom"}
                                label={"Nom"}
                                validation={required}
                            />
                        </div>
                        <div>
                            <Input
                                name={"prenom"}
                                label={"Prenom"}
                                validation={required}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row mb-3">
                        <div className="mr-3">
                            <Input
                                name={"email"}
                                label={"email"}
                                validation={required}
                            />
                        </div>
                        <div>
                            <Input
                                name={"phone"}
                                label={"Telephone"}
                                validation={required}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row mb-3">
                        <div className="mr-3">
                            <Input
                                name={"etablissement"}
                                label={"Etablissement d'origine"}
                                validation={required}
                            />
                        </div>
                        <div>
                            <Input
                                name={"filiere"}
                                label={"Filiere"}
                                validation={required}
                            />
                        </div>
                    </div>
                    {/* <div className="mb-3">
                        <Input
                            name={"etablissement"}
                            label={"Etablissement d'origine"}
                            validation={required}
                        />
                    </div> */}
                    <div className="mb-3">
                        <DatePicker
                            name={"debut_demande"}
                            label={"Debut Stage (demandé)"}
                            type="date"
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            name={"duree"}
                            label={"Durée du Stage (demandé)"}
                            type="number"
                            min={1}
                            defaultValue={1}
                            validation={required}
                        />
                    </div>
                    <div className="flex flex-row justify-end text-white mt-6">
                        <button
                            className="px-4 py-1 rounded-md bg-gray-500 hover:bg-gray-600 mr-2"
                            onClick={() => {
                                onStagiaire();
                            }}
                            type="button"
                        >
                            Annuler
                        </button>
                        <button className="px-4 py-1 rounded-md bg-blue-500 hover:bg-blue-600 ">
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default NewStagiaire;

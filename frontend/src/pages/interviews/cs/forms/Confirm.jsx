import axios from "axios";
import { addMonths, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import DatePicker from "../../../../components/forms/DatePicker";
import Input from "../../../../components/forms/Input";
import { formatDate, isArrayNotNull } from "../../../../functions/Functions";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { entretiens } from "../../../../services/entretiens";
import SelectSearch from "../../../../components/forms/SelectSearch";

function Confirm({ method, data, handleConfirm }) {
    const interv = data;
    const id = interv.id;
    const { reset } = method;
    const stagiaire = data.stagiaire;
    const [nom, setNom] = useState(null);
    const today = format(new Date(), "yyyy-MM-dd");
    const date_interview = stagiaire.debut_demande
        ? format(formatDate(stagiaire.debut_demande), "yyyy-MM-dd")
        : today;

    const unites = useSelector(state=>state.unit.value)

    const unites_with_chef = isArrayNotNull(unites) ? unites.filter(item=>{
        const user = isArrayNotNull(item.users) ? item.users?.some(itemuser=> (itemuser.isChefUnit && itemuser.status)) : false
        return user
    }) : []

    const unites_options = isArrayNotNull(unites_with_chef) ? [
        ...unites_with_chef.map(item=>({
            value: item.id,
            label: item.nom,
        }))
    ] : []

    const submit = async (data) => {
        const body = {
            theme_provisoir: data.theme,
            stagiaire_id: stagiaire.id,
            unite_id: Number(data.unite_id),
            date_debut: format(data.date_debut, "yyyy-MM-dd'T'HH:mm:ss.000'Z"),
            date_fin: format(
                addMonths(data.date_debut, Number(data.duree)),
                "yyyy-MM-dd'T'HH:mm:ss.000'Z"
            ),
        };

        try {
            // const created = await axios.post(`${url}/newStage`, body);
            const validated = await entretiens.validate(id, body);
            if (validated) {
                notifySuccess();
                handleConfirm();
                // generate(data)
            }
        } catch (error) {
            console.log(error);
            notifyError();
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };

    useEffect(() => {
        if (data) {
            setNom(`${stagiaire.nom} ${stagiaire.prenom}`);
            reset({
                duree: stagiaire.duree,
            });
        }
    }, [data]);

    return (
        <>
            <div>
                <div className="mb-6 text-lg text-center px-12">
                    <div className="border-b-2 border-gray-300 pb-2">
                        Nouveau Stage
                    </div>
                </div>
                <FormProvider {...method}>
                    <form
                        onSubmit={method.handleSubmit(onSubmit)}
                        className="min-w-[25vw]"
                    >
                        <div className="mb-4 flex fex-row">
                            <p className="mr-2 underline underline-offset-4">
                                Stagiaire :
                            </p>
                            <p>{nom}</p>
                        </div>

                        <div className="mb-3">
                            <Input
                                label={"Theme de Stage (Provisoir)"}
                                name={"theme"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <SelectSearch
                                label={"Division d'acceuil"}
                                name={"unite_id"}
                                option={unites_options}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <DatePicker
                                label={"Date debut"}
                                name={"date_debut"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type="date"
                                min={date_interview}
                                defaultValue={date_interview}
                            />
                        </div>

                        <div className="mb-3">
                            <Input
                                label={"Durée du Stage (mois)"}
                                name={"duree"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type="number"
                                min={1}
                            />
                        </div>

                        <div className="tex-white flex flex-row justify-end mt-6 text-white">
                            <button
                                type="button"
                                className=" bg-gray-600 hover:bg-gray-700 rounded-[8px] py-1 px-4 mr-2"
                                onClick={() => {
                                    handleConfirm();
                                }}
                            >
                                Annuler
                            </button>
                            <button className=" bg-blue-500 hover:bg-blue-500 rounded-[8px] py-1 px-4 ">
                                Valider
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}

export default Confirm;

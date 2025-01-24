import axios from "axios";
import {
    ChevronDown,
    ChevronUp,
    Loader2
} from "lucide-react";
import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FileInput from "../../../../components/forms/FileInput";
import Input from "../../../../components/forms/Input";

function Edit({ method, handle_edit, data }) {
    const [docs, setDocs] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const url = useSelector((state) => state.backendUrl.value);
    const toastconfig = useSelector(state => state.toastConfig.value);
    const id = data.id;

    const handle_docs = () => {
        setDocs(!docs);
    };

    const submit = async (datas) => {
        setIsLoading(true);
        const body = {
            ...datas,
            nom: (datas.nom).toUpperCase()
        }
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (datas.cv_lien && datas.cv_lien[0]) {
            formData.append("cv_lien", datas.cv_lien[0]);
        }
        if (datas.lm_lien && datas.lm_lien[0]) {
            formData.append("lm_lien", datas.cv_lien[0]);
        }

        try {
            const submited = await axios.patch(
                `${url}/stagiaire/${id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (submited) {
                const message = submited.data.message;
                const type = submited.data.type;
                if (type == "warning") {
                    toast.warning(message, toastconfig);
                } else {
                    toast.success(message, toastconfig);
                    handle_edit(); // Close the form on success
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Une erreur s'est produite", toastconfig);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        submit(data);
    };

    return (
        <>
            <div className="flex flex-col min-w-[25vw]">
                <div className={"mb-4 text-[18px] text-center"}>
                    Modification Stagiaire
                </div>
            </div>
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <fieldset disabled={isLoading} className="space-y-3">
                        <div className="flex flex-row mb-3 justify-between mt-3">
                            <div className="">
                                <Input
                                    label={"Nom"}
                                    name={"nom"}
                                    validation={{
                                        required: "Valeur requise",
                                    }}
                                />
                            </div>
                            <div className="">
                                <Input
                                    label={"Prenom"}
                                    name={"prenom"}
                                    validation={{
                                        required: "Valeur requise",
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row mb-3 justify-between">
                            <div className="">
                                <Input
                                    label={"Email"}
                                    name={"email"}
                                    validation={{
                                        required: "Valeur requise",
                                    }}
                                />
                            </div>
                            <div className="">
                                <Input
                                    label={"Phone "}
                                    name={"phone"}
                                    validation={{
                                        required: "Valeur requise",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mb-3 justify-between">
                            <div className="">
                                <Input
                                    label={"Filiere "}
                                    name={"filiere"}
                                    validation={{
                                        required: "Valeur requise",
                                    }}
                                />
                            </div>
                            <div className="">
                            <Input
                                label={"Etablissement"}
                                name="etablissement"
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>
                        </div>
                        {(data.cv_lien || data.lm_lien) && (
                            <div
                                className="mt-2 flex flex-row justify-end items-center text-blue-400 hover:text-blue-500 text-[18px]x cursor-pointer"
                                onClick={() => {
                                    handle_docs();
                                }}
                            >
                                {!docs ? (
                                    <ChevronDown size={19} />
                                ) : (
                                    <ChevronUp size={19} />
                                )}

                                <p type="button" className="ml-1">
                                    Modifier les Documents
                                </p>
                            </div>
                        )}

                        {(!data.cv_lien || !data.lm_lien || docs) && (
                            <>
                                <div className="mb-3">
                                    <FileInput
                                        label={"CV Numerique"}
                                        name="cv_lien"
                                        validation={
                                            !data.cv_link && {
                                                required: "Valeur requise",
                                            }
                                        }
                                        className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                                    />
                                </div>
                                <div className="mb-3">
                                    <FileInput
                                        label={"LM Numerique"}
                                        name="lm_lien"
                                        validation={
                                            !data.lm_link && {
                                                required: "Valeur requise",
                                            }
                                        }
                                        className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                                    />
                                </div>
                            </>
                        )}

                        <div className="mt-9 flex flex-row justify-end space-x-4">
                            <button
                                className="bg-gray-500 text-white py-2 px-6 rounded-[8px] disabled:opacity-50"
                                type="button"
                                onClick={handle_edit}
                                disabled={isLoading}
                            >
                                Annuler
                            </button>
                            <button 
                                className="bg-blue-500 text-white py-2 px-6 rounded-[8px] disabled:opacity-50 flex items-center space-x-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Chargement...</span>
                                    </>
                                ) : (
                                    <span>Valider</span>
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
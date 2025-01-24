import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import Input from "../../../../components/forms/Input";
import FileInput from "../../../../components/forms/FileInput";
import axios from "axios";

function New({ handle_new }) {
    const method = useForm();
    const url = useSelector(state => state.backendUrl.value);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const submit = async(data) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('nom', (data.nom).toUpperCase());
      formData.append('prenom', data.prenom);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("niveau", data.niveau);
      formData.append("filiere", data.filiere);
      formData.append("etablissement", data.etablissement);

      if (data.cv_link?.[0]) {
          formData.append("cv_link", data.cv_link[0]);
      }
      if (data.lm_link?.[0]) {
          formData.append("lm_link", data.lm_link[0]);
      }

      try {
        await axios.post(
          `${url}/stagiaire`,
          formData,
          {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
            }
          }
        );
        
        notifySuccess("Stagiaire ajouté avec succès!");
        handle_new();
      } catch (error) {
        console.error(error);
        notifyError("Erreur lors de l'ajout du stagiaire");
      } finally {
        setIsLoading(false);
        setUploadProgress(0);
      }
    };

    const onSubmit = (data) => {
      submit(data);
    };

    return (
        <div className="min-w-[25vw]">
            <div className="mb-4 text-[18px]">
                Nouveau Stagiaire
                {uploadProgress > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                        Téléchargement: {uploadProgress}%
                        <div className="h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
            
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className="flex flex-row mb-3 justify-between">
                        <div className="w-[48%]">
                            <Input
                                label="Nom"
                                name="nom"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="w-[48%]">
                            <Input
                                label="Prenom"
                                name="prenom"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row mb-3 justify-between">
                        <div className="w-[48%]">
                            <Input
                                label="Email"
                                name="email"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="w-[48%]">
                            <Input
                                label="Phone"
                                name="phone"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row mb-3 justify-between">
                        <div className="w-[48%]">
                            <Input
                                label="Niveau"
                                name="niveau"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="w-[48%]">
                            <Input
                                label="Filiere"
                                name="filiere"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <Input
                            label="Etablissement"
                            name="etablissement"
                            validation={{
                                required: "Valeur requise"
                            }}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-3">
                        <FileInput
                            label="CV Numerique"
                            name="cv_link"
                            validation={{
                                required: "Valeur requise"
                            }}
                            className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-3">
                        <FileInput
                            label="LM Numerique"
                            name="lm_link"
                            validation={{
                                required: "Valeur requise"
                            }}
                            className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="text-white mt-5 flex flex-row justify-end">
                        <button 
                            className="px-4 py-1 bg-gray-600 rounded-[8px] hover:bg-gray-700 mr-2 disabled:opacity-50"
                            type="button" 
                            onClick={handle_new}
                            disabled={isLoading}
                        >
                            Annuler
                        </button>
                        <button 
                            className="px-4 py-1 bg-blue-500 rounded-[8px] hover:bg-blue-600 disabled:opacity-50 flex items-center"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Traitement...</span>
                                </>
                            ) : (
                                'Valider'
                            )}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

export default New;
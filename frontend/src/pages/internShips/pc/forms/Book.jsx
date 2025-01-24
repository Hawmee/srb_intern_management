import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FileInput from "../../../../components/forms/FileInput";
import { differenceInMonths, format } from "date-fns";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { Stage } from "../../../../services/stage";
import { today_string } from "../../../../functions/Functions";
import AttestationPDF from "../../../../components/Files/AttesationPDF";
import { pdf } from "@react-pdf/renderer";
import n2words from "n2words";
import { Loader2 } from "lucide-react"; // Import the loading spinner

function Book({ data, onBook }) {
    const method = useForm();
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const stagiaire = data.stagiaire;
    const stage = data;
    const date = format(new Date(), "dddd-MM");
    const numero = `${date}${stagiaire.id}`;

    const generate = async () => {
        const duree =
            Number(differenceInMonths(stage.date_fin, stage.date_debut)) == 0
                ? 1
                : differenceInMonths(stage.date_fin, stage.date_debut);
        const attestation = {
            numero: numero,
            stagiaire: `${stagiaire.nom.toUpperCase()} ${stagiaire.prenom}`,
            lettre_duree: n2words(duree, { lang: "fr" }),
            duree: duree,
        };
        const today = today_string();
        const pdfBlob = await pdf(
            <AttestationPDF isAttestation={true} attestation={attestation} />
        ).toBlob();
        const url_pdf = URL.createObjectURL(pdfBlob);

        const printWindow = window.open(url_pdf);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.onafterprint = () => printWindow.close();
            };
        }
    };

    const submit = async (data) => {
        setIsLoading(true); // Set loading to true
        const { book } = data;
        const formData = new FormData();
        if (data.book && data.book[0]) {
            formData.append("book", data.book[0]);
        }
        formData.append("numero", numero);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const booked = await Stage.booking(Number(stage.id), formData);
            if (booked) {
                notifySuccess();
                onBook();
                generate();
            }
        } catch (error) {
            console.log(error);
            notifyError();
        } finally {
            setIsLoading(false); // Set loading to false
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };

    return (
        <>
            <FormProvider {...method}>
                <form
                    className="w-[20vw]"
                    onSubmit={method.handleSubmit(onSubmit)}
                >
                    <div className=" mb-4 text-center text-lg px-12 ">
                        <div className="pb-2 border-b-2 border-gray-300">
                            Finalisation du Stage:
                        </div>
                    </div>
                    <fieldset disabled={isLoading}> {/* Disable fields when loading */}
                        <div className="mb-3">
                            <FileInput
                                label={"Rapport de stage Final"}
                                name={"book"}
                                validation={{
                                    required:
                                        "Fichier requise pour la finalisation du stage",
                                }}
                                className="border-[2px] border-gray-300 p-2 rounded-[8px] max-w-[20vw]"
                            />
                        </div>
                        <div className="flex flex-row justify-end text-white mt-4">
                            <button
                                type="button"
                                className=" bg-gray-500 hover:bg-gray-600 px-4 py-1 rounded-lg mr-2 disabled:opacity-50"
                                onClick={() => {
                                    onBook();
                                }}
                                disabled={isLoading} // Disable button when loading
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className=" bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg disabled:opacity-50 flex items-center space-x-2"
                                disabled={isLoading} // Disable button when loading
                            >
                                {isLoading ? ( // Show loading spinner and text
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Chargement...</span>
                                    </>
                                ) : (
                                    "Valider"
                                )}
                            </button>
                        </div>
                    </fieldset>
                </form>
            </FormProvider>
        </>
    );
}

export default Book;
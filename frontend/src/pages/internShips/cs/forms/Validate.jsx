import axios from "axios";
import { differenceInMonths, format } from "date-fns";
import { toWords } from "number-to-words";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import n2words from 'n2words'
import AttestationPDF from "../../../../components/Files/AttesationPDF";
import { pdf } from "@react-pdf/renderer";

function Validate({ data, handleValidate }) {
    const stage_id = data.id;
    const stage = data
    const url = useSelector((state) => state.backendUrl.value);
    const conf = useSelector((state) => state.toastConfig.value);
    const stagiaire = data.stagiaire

    const date = format(new Date() , 'yyyy-MM')

    const numero = `${date}${stagiaire.id}`
        
    const duree = differenceInMonths(stage.date_fin , stage.date_debut)


    const generate = async () => {

        const attestation = {
            numero: numero,
            stagiaire: `${stagiaire.nom} ${stagiaire.prenom}`,
            lettre_duree:  n2words(duree , {lang: 'fr'}),
            duree: duree,
        }

        try {
            const pdfBlob = await pdf(<AttestationPDF isAttestation={true} attestation={attestation} />).toBlob();
            const url_pdf = URL.createObjectURL(pdfBlob);
            
            const printWindow = window.open(url_pdf);
            if (printWindow) {
                printWindow.onload = () => {
                    printWindow.onafterprint = () => printWindow.close();
                };
            }
        } catch (error) {
            toast.error("Error generating PDF");
        }
    };



    const onSubmit = async () => {
        try {
            const validated = await axios.patch(
                `${url}/stage/valid/${stage_id}` , {numero: numero}
            );
            if (validated) {
                const message = "Action reussite !";
                handleValidate();
                toast.success(message, conf);
                generate()
            }
        } catch (error) {
            console.log(error);
            const message = "Erreur lors de l'operation";
            toast.error(message, conf);
        }
    };

    return (
        <>
            <div className="min-w-[20vw]">
                <div className="text-center text-lg"> Stage validé : </div>
                <div className="mt-3 text-lg">
                    Voulez-vous vraiment poursuivre cette action ?
                </div>
                <div className="flex flex-row justify-end">
                     <p className="text-blue-500 cursor-pointer underline underline-offset-4" onClick={()=>{generate()}} >Apercu de l'attestation</p>
                </div>
                <div className="flex flex-row justify-end text-white mt-6">
                    <button
                        className="bg-gray-500 hover:bg-gray-400 rounded-[8px] px-4 py-1 mr-3"
                        onClick={() => {
                            handleValidate();
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 rounded-[8px] px-4 py-1"
                        onClick={() => {
                            onSubmit();
                        }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default Validate;

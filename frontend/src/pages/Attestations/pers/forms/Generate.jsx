import React from "react";
import { date_d_m_y, today_string } from "../../../../functions/Functions";
import AttesationPDF from "../../../../components/Files/AttesationPDF";
import { pdf } from "@react-pdf/renderer";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import axios from "axios";
import { useSelector } from "react-redux";
import { differenceInDays, differenceInMonths, format } from "date-fns";
import n2words from 'n2words'


function Generate({ data, handleAttestation }) {
    const url = useSelector(state=>state.backendUrl.value)

    const stage = data
    const stagiaire = data.stagiaire;
    const attestation = data.attestation
    const id = data.id
    const date = format(new Date(), "ddMM");
    const numero = `${date}${String(stagiaire.id).padStart(4 , "0")}`
    const duree = differenceInMonths(stage.date_fin , stage.date_debut)

    const generate = async ()=>{
        const attestation = {
            numero: numero,
            stagiaire: `${stagiaire.nom} ${stagiaire.prenom}`,
            lettre_duree: n2words(duree , {lang: 'fr'}),
            duree: duree
        }

        const pdfBlob = await pdf(<AttesationPDF isAttestation={true} attestation={attestation} />).toBlob()
        const url_pdf = URL.createObjectURL(pdfBlob)
        
        const printWindow = window.open(url_pdf)
        if(printWindow){
            printWindow.onload = ()=>{
                // printWindow.print()
                printWindow.onafterprint = () => printWindow.close();
            }            
        }
        
    }

    const onSubmit = async()=>{
        try {
            if(!attestation){
                const body ={
                    stage_id:Number(id),
                    numero:numero,
                }
                const new_Attestation = await axios.post(`${url}/attestation` , body)
                if(new_Attestation){
                    const message = "Action reussite !"
                    notifySuccess(message)
                    generate()
                    handleAttestation()
                }
            }else{
                const update_Attesation = await axios.patch(`${url}/attestation/${attestation.id}` , {numero:numero})
                if(update_Attesation){
                    const message = "Action reussite !"
                    notifySuccess(message)
                    generate()
                    handleAttestation()
                }
            }
        } catch (error) {
            console.log(error)
            const message = "Erreur lors de l'operation !"
            notifyError(message)
        }
    }

    return (
        <>
            <div className="flex flex-col w-[24vw]">
                <div className="text-center text-lg  mb-3 px-12">
                    <div className="border-b-[2px] border-gray-300 pb-2 ">
                        Generer une Attestation
                    </div>
                </div>
                <div className="text-lg text-center">Voulez vous vraiment generer une Attestation ?</div>
                {/* <div className="text-sm text-blue-500 underline underline-offset-4 text-end mt-4 cursor-pointer" onClick={()=>{generate()}}> Voir l'apercu de l'attestation</div> */}
                <div className="flex flex-row justify-end text-white mt-4">
                    <button
                        className="bg-gray-600 hover:bg-gray-700 rounded-[8px] px-4 py-1 mr-3"
                        onClick={() => {
                            handleAttestation()
                        }}
                    >
                        Annuler
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-[8px] px-4 py-1 "
                        onClick={()=>{
                            onSubmit()
                        }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default Generate;

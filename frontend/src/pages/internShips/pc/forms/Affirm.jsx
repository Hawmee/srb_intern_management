import React from "react";
import { date_d_m_y } from "../../../../functions/Functions";
import AttestationPDF from "../../../../components/Files/AttesationPDF";
import { pdf } from "@react-pdf/renderer";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { Stage } from "../../../../services/stage";

function Affirm({ data, onAffirm }) {

    const stage = data
    const stage_id = stage.id

    const generate = async(data)=>{
        const unite = stage.unite
        const encadreur = unite ? unite.users[0] : {
            nom: '- - -',
            fonction : "- - -",
            serv: ' - - - ',
        }
        const stagiaire= stage.stagiaire

        const reponse = {
            encadreur:{
                nom: encadreur.nom+" "+encadreur.prenom,
                fonction : "Chef de division",
                serv: unite.nom,
            },
            stagiaire:{
                mention: stagiaire.filiere,
                nombre: '1',
                periode: `${date_d_m_y(stage.date_debut)} - ${date_d_m_y(stage.date_fin)}`
            }
        }


        const pdfBolb = await pdf(<AttestationPDF isReponse={true} reponse={reponse}/>).toBlob()
        const url_pdf = URL.createObjectURL(pdfBolb)

        const printWindow = window.open(url_pdf)
        if(printWindow){
            printWindow.onload = ()=>{
                printWindow.onafterprint = ()=>{
                    printWindow.close()
                }
            }
        }
    }


    const submit = async ()=>{
        try {
            const affirmed = await Stage.affirm(stage_id)
            if(affirmed){
                onAffirm()
                notifySuccess()
                generate()
            }
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }


    return (
        <>
            <div className="flex flex-col min-w-[20vw]">
                <div className="text-center px-12 text-lg mb-4">
                    <div className="border-b-2 border-gray-300 pb-2">
                        Affirmation du stage
                    </div>
                </div>
                <div className=" text-lg text-center">
                    Voulez-vous poursuivre cette action ?
                </div>
                {/* <div className="mb-3 flex flex-row justify-end">
                        <p className="text-blue-400 underline underline-offset-4 cursor-pointer hover:text-blue-500 " onClick={()=>{generate()}}>
                            Voir l'apercu de la fiche de reponse{" "}
                        </p>
                    </div> */}
                <div className="flex flex-row justify-end text-white mt-6">
                    <button
                        className=" bg-gray-500 hover:bg-gray-600 px-4 py-1 rounded-lg mr-2"
                        onClick={() => {
                            onAffirm();
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        className=" bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg"
                        onClick={()=>{
                            submit()
                        }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default Affirm;

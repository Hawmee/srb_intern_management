import React from "react";
import AttestationPDF from "../../../../components/Files/AttesationPDF";
import { stagiaire } from "../../../../services/stagiaire";
import { date_d_m_y, isArrayNotNull } from "../../../../functions/Functions";
import { pdf } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { Stage } from "../../../../services/stage";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";

function Print({ data, onPrint }) {
    const account = useSelector((state) => state.account.value);

    const generate = async () => {
        const stage = data;
        const stagiaire = stage.stagiaire;
        const unite = stage.unite;
        const encadreur_array = unite.users;
        const encadreur_stage = isArrayNotNull(encadreur_array)
            ? encadreur_array.find((item) => item.status && item.isChefUnit)
            : [];
        const encadreur = isArrayNotNull(account)
            ? account.find(
                  (item) =>
                      Number(item.unite_id) == Number(stage.unite_id) &&
                      item.isChefUnit &&
                      item.status
              )
            : [];
        const performance = stage.performance;

        const evaluation = {
            encadreur: {
                nom: `${encadreur ? encadreur.nom.toUpperCase() : "- - -"} ${
                    encadreur ? encadreur.prenom : "- - -"
                }`,
                fonction: "Chef de Division",
                serv: unite.nom,
            },
            stagiaire: {
                nom: `${stagiaire.nom.toUpperCase()} ${stagiaire.prenom}`,
                origine: `${stagiaire.etablissement}`,
                filiere: `${stagiaire.filiere.toUpperCase()}`,
                periode: `${date_d_m_y(stage.date_debut)} - ${date_d_m_y(
                    stage.date_fin
                )}`,
            },
            perf: {
                pro: performance.pertinance_pro,
                tech: performance.pertinance_tech,
                pedago: performance.pertinance_pedago,
                total:
                    Number(performance.pertinance_pro) +
                    Number(performance.pertinance_tech) +
                    Number(performance.pertinance_pedago),
                observ: performance.observation.toUpperCase(),
            },
        };

        console.log(evaluation);

        const pdfBlob = await pdf(
            <AttestationPDF isEvaluation={true} evaluation={evaluation} />
        ).toBlob();
        const url_pdf = URL.createObjectURL(pdfBlob);

        const printWindow = window.open(url_pdf);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.onafterprint = () => printWindow.close();
            };
        }
    };

    const submit = async()=>{
        try {
            const stage = data
            const printed = await Stage.printed(stage.id)
            if(printed){
                generate()
                notifySuccess()
                onPrint()
            }
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }

    return (
        <>
            <div className="w-[20vw]">
                <div className="text-lg text-center px-12 mb-4">
                    <div className="under-line">
                        Generation de la Performance du Stage
                    </div>
                </div>

                <div className="text-lg mb-6">
                    Voulez-vous poursuivre cette action ?
                </div>

                <div className="fl-row justify-end">
                    <button
                        className="btn-cancel mr-2"
                        onClick={() => {
                            onPrint();
                        }}
                    >
                        Annuler
                    </button>
                    <button className="btn-primary" onClick={submit}>
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default Print;

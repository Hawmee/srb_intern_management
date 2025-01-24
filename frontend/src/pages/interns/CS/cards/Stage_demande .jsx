import React from "react";
import { date_d_m_y, getDomain } from "../../../../functions/Functions";

function StageDemande({ data }) {
    const stagiaire = data;
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden 
            border border-gray-200 transition-all duration-300 
            hover:shadow-xl hover:scale-[1.02]">
            <div className="bg-wite px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-blue-400 
                    tracking-wide leading-tight">
                    Détails de la Demande
                </h2>
            </div>
            <div className="px-6 py-5 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Début de Stage demandé
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {stagiaire.debut_demande
                            ? date_d_m_y(stagiaire.debut_demande)
                            : "Non spécifié"}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Durée de Stage
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {stagiaire.duree} Mois
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StageDemande;
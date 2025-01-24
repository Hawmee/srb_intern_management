import React from "react";
import { date_d_m_y, getDomain } from "../../../../functions/Functions";
import { observation_stage } from "../../../../utils/Observations";
import { DatabaseIcon, ExternalLink } from "lucide-react";

function InternShip({ data }) {
    const stage = data;

    return (
        <div
            className="bg-white shadow-md rounded-2xl overflow-hidden 
            border border-gray-200 transition-all duration-300 
            hover:shadow-xl hover:scale-[1.02]"
        >
            <div className="bg-white px-6 py-4 border-b border-gray-200">
                <h2
                    className="text-lg font-bold text-blue-400 
                    tracking-wide leading-tight"
                >
                    Stage
                </h2>
            </div>
            {data && (
                <div className="px-6 py-5 space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Theme</span>
                        <span className="text-gray-800 font-semibold">
                            {data.theme_definitif || data.theme_provisoir}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Unité d'acceuil
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {data.unite.nom}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Date debut
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {date_d_m_y(data.date_debut)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Date fin
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {date_d_m_y(data.date_fin)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Observation
                        </span>
                        <span
                            className={`px-4 text-white rounded-2xl font-semibold
                                ${
                                    (stage.observation ===
                                        observation_stage.non_affirme ||
                                        stage.observation ===
                                            observation_stage.en_validation ||
                                        stage.observation ===
                                            observation_stage.a_venir ||
                                        stage.observation ===
                                            observation_stage.cloturation) &&
                                    "bg-gray-500"
                                }
                                ${
                                    (stage.observation ===
                                        observation_stage.en_cours ||
                                        stage.observation ===
                                            observation_stage.acheve ||
                                        stage.observation ===
                                            observation_stage.cloture) &&
                                    "bg-blue-500"
                                }
                                ${
                                    (stage.observation ===
                                        observation_stage.re_valide ||
                                        stage.observation ===
                                            observation_stage.abandon) &&
                                    "bg-red-500"
                                }
                            `}
                        >
                            {!stage.unite ? "A assigner" : stage.observation}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Rapport de stage (Document)
                        </span>
                        <a
                            href={stage.book_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            {stage.book_link ? (
                                <div className="ml-2 text-blue-400 hover:to-blue-500">
                                    <ExternalLink
                                        size={20}
                                        className="ml-2 transform transition-all duration-200 hover:scale-110"
                                    />
                                </div>
                            ) : (
                                <>- - - </>
                            )}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InternShip;

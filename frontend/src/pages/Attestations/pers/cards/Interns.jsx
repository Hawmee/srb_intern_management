import React from "react";
import { getDomain } from "../../../../functions/Functions";
import { ExternalLink } from "lucide-react";

function Interns({ data }) {
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
                    Stagiaire
                </h2>
            </div>
            {data && (
                <div className="px-6 py-5 space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Nom</span>
                        <span className="text-gray-800 font-semibold">
                            {data.nom}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Prenoms
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {data.prenom}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Email</span>
                        <span className="text-gray-800 font-semibold">
                            {data.email}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Phone</span>
                        <span className="text-gray-800 font-semibold">
                            {data.phone}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Etablissement
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {data.etablissement.toUpperCase()}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Filiere
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {data.filiere.toUpperCase()}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            CV (Document)
                        </span>
                        <a
                            href={data.cv_lien}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            <div className="ml-2 text-blue-400 hover:to-blue-500">
                                <ExternalLink
                                    size={20}
                                    className="ml-2 transform transition-all duration-200 hover:scale-110"
                                />
                            </div>
                        </a>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            LM (Document)
                        </span>
                        <a
                            href={data.lm_lien}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                        >
                            <div className="ml-2 text-blue-400 hover:to-blue-500">
                                <ExternalLink
                                    size={20}
                                    className="ml-2 transform transition-all duration-200 hover:scale-110"
                                />
                            </div>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Interns;

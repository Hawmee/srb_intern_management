import { ExternalLink } from "lucide-react";
import React from "react";

function Details({ attestation }) {
    const stage = attestation.stage;
    const stagiaire = stage.stagiaire;
    const unite = stage.unite;
    const performance = stage.performance; // Use performance data from stage

    console.log(performance);

    return (
        <div>
            {/* Stagiaire Section */}
            <h2 className="text-lg font-bold text-blue-400 tracking-wide leading-tight mb-1">
                Stagiaire
            </h2>
            <div className="space-y-2 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Nom & Prénoms
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {stagiaire.nom} {stagiaire.prenom}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Email</span>
                    <span className="text-gray-800 font-semibold">
                        {stagiaire.email}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Téléphone</span>
                    <span className="text-gray-800 font-semibold">
                        {stagiaire.phone}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Filière</span>
                    <span className="text-gray-800 font-semibold">
                        {stagiaire.filiere.toUpperCase()}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Établissement
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {stagiaire.etablissement.toUpperCase()}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        CV (Document)
                    </span>
                    <a
                        href={stagiaire.cv_lien}
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
                        href={stagiaire.lm_lien}
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

            {/* Stage Section */}
            <h2 className="text-lg font-bold text-blue-400 tracking-wide leading-tight mb-1">
                Stage
            </h2>
            <div className="space-y-2 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Thème</span>
                    <span className="text-gray-800 font-semibold">
                        {stage.theme_definitif || stage.theme_provisoir}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Date Début
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {new Date(stage.date_debut).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Date Fin</span>
                    <span className="text-gray-800 font-semibold">
                        {new Date(stage.date_fin).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Division d'acceuil
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {unite.nom}
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

            {/* Performance Section */}
            {performance && (
                <>
                    <h2 className="text-lg font-bold text-blue-400 tracking-wide leading-tight mb-1">
                        Performance de Stage
                    </h2>
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">
                                Comportement Professionnel
                            </span>
                            <span className="text-gray-800 font-semibold">
                                {performance.pertinance_pro || "N/A"} /20
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">
                                Pertinence Technique
                            </span>
                            <span className="text-gray-800 font-semibold">
                                {performance.pertinance_tech || "N/A"} /20
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">
                                Pertinence Pédagogique
                            </span>
                            <span className="text-gray-800 font-semibold">
                                {performance.pertinance_pedago || "N/A"} /20
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">
                                Observation
                            </span>
                            <span className="text-gray-800 font-semibold">
                                {performance.observation.toUpperCase() || "N/A"}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Details;

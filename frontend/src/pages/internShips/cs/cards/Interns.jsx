import { PenSquare } from "lucide-react";
import React from "react";

function Interns({ data }) {
    return (
        <>
            <div className="flex flex-col min-h-28 bg-gray-100 rounded-[12px] p-4 text-gray-700  shadow-shadow-md ">
                <div className="text-center text-lg border-b-[2px] border-gray-300 pb-2">
                    Stagiaire :
                </div>
                {data && (
                    <>
                        <div className="flex flex-col text-base mt-6  pb-2 ">
                            <div className="mb-3">
                                -Nom & Prenoms: {data.nom + " " + data.prenom}
                            </div>
                            <div className="mb-3">-Email: {data.email}</div>
                            <div className="mb-3">-Phone: {data.phone}</div>
                            <div className="mb-3">-Niveau: {data.niveau}</div>
                            <div className="mb-3">-Filiere: {data.filiere}</div>
                            <div className="mb-4">
                                -Etablissement: {data.etablissement}
                            </div>
                            <div className="mb-4">
                                -CV Numerique:{" "}
                                {data.cv_link && (
                                    <a
                                        href={data.cv_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400"
                                    >
                                        Voir le CV sur DRIVE
                                    </a>
                                )}
                                {!data.cv_link && ""}
                            </div>{" "}
                            <div className="mb-3">
                                -LM Numerique:{" "}
                                {data.lm_link && (
                                    <a
                                        href={data.lm_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400"
                                    >
                                        Voir la LM sur DRIVE
                                    </a>
                                )}
                                {!data.lm_link && ""}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Interns;

import React from "react";
import { date_d_m_y, isArrayNotNull } from "../../../../functions/Functions";

function InternShips({ data }) {

    const unite = data && data.unite ? data.unite : null
    const encadreur = unite && isArrayNotNull(unite.users) ? (unite.users.find(user=>user.status)) : null

    return (
        <>
            <div className="flex flex-col min-h-[12vh] bg-gray-100 rounded-[12px]  p-4 text-gray-700">
                <div className="text-lg px-4 text-center ">
                    <div className="border-b-[2px] border-gray-300 pb-2">
                        Details
                    </div>
                </div>
                {data && (
                    <>
                        <div className="flex flex-col text-base mt-6  pb-2 ">
                            <div className="mb-4">
                                <p className="inline">-Theme:</p>
                                <p className="inline ml-2">
                                    {data.theme}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="inline">-Date debut:</p>
                                <p className="inline ml-2">
                                    {date_d_m_y(data.date_debut)}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="inline">-Date fin:</p>
                                <p className="inline ml-2">
                                    {date_d_m_y(data.date_fin)}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="inline">-Encadreur:</p>
                                <p className="inline ml-2">
                                    {encadreur? `${encadreur.nom} ${encadreur.prenom}` : "-"}
                                </p>
                            </div>

                            <div className=" whitespace-normal ">
                                <p className="inline">-Rapport de Stage :</p>
                                {data.book_link && (
                                    <a
                                        href={data.book_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline text-blue-400 ml-2"
                                    >
                                        Voir le Rapport de Stage sur DRIVE
                                    </a>
                                )}
                                {!data.book_link && (
                                    <p className=" inline ml-2 text-red-400">
                                        (Stage non affrimé )
                                    </p>
                                )}
                            </div>{" "}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default InternShips;

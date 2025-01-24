import React from "react";
import { date_d_m_y, getDomain } from "../../../../functions/Functions";

function Details({ data }) {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden 
            border border-gray-200 transition-all duration-300 
            hover:shadow-xl hover:scale-[1.02]">
            <div className="bg-white px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-blue-400 
                    tracking-wide leading-tight">
                    Details
                </h2>
            </div>
            {data && (
                <div className="px-6 py-5 space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Theme
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {data.theme_definitif || data.theme_provisoir}
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
                            Status
                        </span>
                        <span
                            className={`font-semibold px-2 rounded-[12px]
                                ${
                                    data.observation === "Annulé" ||
                                    data.observation === "Revalidation"
                                        ? "bg-red-400 text-white"
                                        : data.observation === "Achevé"
                                        ? "bg-blue-500 text-white"
                                        : data.observation === "En cours" ||
                                          data.observation === "Validation"
                                        ? "bg-gray-600 text-white"
                                        : ""
                                }`}
                        >
                            {data.observation}
                        </span>
                    </div>
                    {data.observation === "Revalidation" && (
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">
                                Motif de revalidation
                            </span>
                            <span className="text-gray-800 font-semibold">
                                {data.motif_revalidation}
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Rapport de stage
                        </span>
                        {data.book_link ? (
                            <a
                                href={data.book_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline underline-offset-2"
                            >
                                {getDomain(data.book_link)}/RPS_{data.id}
                            </a>
                        ) : (
                            <span className="text-gray-800 font-semibold">
                                - - -
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Details;
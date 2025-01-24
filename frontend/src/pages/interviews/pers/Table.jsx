import { addHours, format, isBefore, parseISO, startOfMinute } from "date-fns";
import { FileQuestion, Mail, MailCheck } from "lucide-react";
import React, { useEffect, useRef, onInform } from "react";
import { isArrayNotNull } from "../../../functions/Functions";

function Table({ data, onMail, onInform }) {
    const tableContainerRef = useRef(null);

    const formated_date = (date) => {
        const datestring = parseISO(date);
        const timezone = -3;
        const localDate = addHours(datestring, timezone);
        return localDate;
    };

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px] bg-gray-50 ">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] bg-gray-50 overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-l-[12px]" > Stagiaire </th>
                                    <th>Dossiers du stagiaire</th>
                                    <th>Date d'entretient</th>
                                    <th>Etat</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => {
                                        const isDone = item.status
                                        return (
                                            <tr key={item.id} className="h-1">
                                                <td
                                                    className={
                                                        item.isNew
                                                            ? "border-l-[5px] border-blue-400"
                                                            : ""
                                                    }
                                                >
                                                    {item.stagiaire.nom}{" "}
                                                    {item.stagiaire.prenom}
                                                </td>
                                                <td>
                                                    <div className="flex flex-row">
                                                        <a
                                                            href={
                                                                item.stagiaire
                                                                    .cv_lien
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mr-2 flex justify-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                        >
                                                            CV (lien)
                                                        </a>
                                                        <a
                                                            href={
                                                                item.stagiaire
                                                                    .lm_lien
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className=" flex justify-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                        >
                                                            LM (lien)
                                                        </a>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.date_entretien ? (
                                                        format(
                                                            formated_date(
                                                                item.date_entretien
                                                            ),
                                                            "dd/MM/yyyy , HH:mm"
                                                        )
                                                    ) : (
                                                        <p>
                                                            (Choisir une date)
                                                        </p>
                                                    )}
                                                </td>{" "}
                                                <td>
                                                    <div className="flex flex-row text-white">
                                                        {item.status ? (
                                                            <p className="bg-blue-500 px-4 rounded-xl">
                                                                Terminé
                                                            </p>
                                                        ) : item.isInforme ? (
                                                            <p className="bg-gray-500 px-4 rounded-xl">
                                                                En attente
                                                            </p>
                                                        ) : (
                                                            <p className="bg-red-500 px-4 rounded-xl">
                                                                Non communiqué
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex flex-row items-center justify-center text-white">
                                                        <button
                                                            className="text-blue-600 mr-2 px-3 py-1 hover:text-blue-700 disabled:text-blue-300"
                                                            onClick={() => {
                                                                onMail(item);
                                                            }}

                                                            disabled={isDone}
                                                        >
                                                            <Mail size={25} />
                                                        </button>
                                                        <button
                                                            className={
                                                                !item.isInforme
                                                                    ? "text-blue-600 mr-2 px-3 py-1 hover:text-blue-700"
                                                                    : "text-blue-300  mr-2 px-3 py-1"
                                                            }
                                                            onClick={() => {
                                                                onInform(item);
                                                            }}
                                                            disabled={
                                                                (item.isInforme || isDone)
                                                            }
                                                        >
                                                            <MailCheck
                                                                size={25}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        {!isArrayNotNull(data) && (
                            <div className="flex flex-col items-center justify-center w-full h-[50vh] text-gray-500">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <FileQuestion
                                        className="text-gray-400"
                                        size={32}
                                    />
                                </div>
                                <div className="text-lg font-medium">
                                    Aucune donnée disponible
                                </div>
                                <p className="text-sm text-gray-400">
                                    Les données d'entretiens apparaîtront ici
                                    une fois disponible
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;

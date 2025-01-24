import React, { useEffect, useRef, useState } from "react";
import {
    date_d_m_y,
    formatDate,
    include,
    isArray,
    isArrayNotNull,
} from "../../../functions/Functions";
import { Mail } from "lucide-react";
import {
    addDays,
    differenceInDays,
    isWithinInterval,
    parseISO,
    startOfDay,
} from "date-fns";

function Table({ data, onSelect, selected }) {
    const tableContainerRef = useRef(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const hasNearDeadlines = (tasks) =>
        tasks?.some((task) => {
            const today = startOfDay(new Date());
            const deadlineDate = parseISO(task.date_fin);
            const interval = { start: today, end: addDays(today, 3) };
            const isNotFinished = !task.status;

            return isWithinInterval(deadlineDate, interval) && isNotFinished;
        }) ?? false;

    const countNearDeadlines = (tasks) => {
        if (isArrayNotNull(tasks)) {
            const today = startOfDay(new Date());
            return tasks.filter((task) => {
                const deadlineDate = startOfDay(formatDate(task.deadline));
                const daysUntilDeadline = differenceInDays(deadlineDate, today);
                return daysUntilDeadline >= 0 && daysUntilDeadline <= 3;
            }).length;
        }
        return null;
    };

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    useEffect(() => {
        if (selected) {
            setSelectedRow(selected.id);
        }
    }, [selected]);

    return (
        <>
            <div className="px-2 mt-4 pb-2 relative text-[16px] bg-gray-50 ">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] bg-gray-50 overflow-auto"
                    >
                        <table className="table table-fixed text-left w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Stagiaire
                                    </th>
                                    <th> Theme </th>
                                    <th>Date Debut</th>
                                    <th>Date Fin</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        Taches
                                    </th>
                                    {/* <th> Dossiers </th> */}
                                    {/* <th className="rounded-tr-[12px] rounded-br-[12px]">
                                    </th> */}
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="h-2"></tr>
                                {data &&
                                    data.map((item) => {
                                        const taches = item.taches;
                                        const stagiaire = item.stagiaire;
                                        const theme = item.theme_definitif
                                            ? item.theme_definitif
                                            : item.theme_provisoir;
                                        const nearDeadline =
                                            hasNearDeadlines(taches);

                                        return (
                                            <tr
                                                key={item.id}
                                                className={`cursor:pointer h-1 rounded-[12px] hover:bg-gray-200 pt-2 cursor-pointer ${
                                                    selectedRow == item.id &&
                                                    " bg-gray-200"
                                                } 
                                                    ${
                                                        nearDeadline &&
                                                        "border-l-[4px] border-blue-400"
                                                    }
                                                `}
                                                onClick={() => {
                                                    onSelect(item);
                                                }}
                                            >
                                                <td className="rounded-l-[12px]">
                                                    {stagiaire.nom}{" "}
                                                    {stagiaire.prenom}
                                                </td>
                                                <td>
                                                    <div className="flex flex-row">
                                                        <p className="text-blue-500">
                                                            {theme}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>{date_d_m_y(item.date_debut)}</td>
                                                <td>{date_d_m_y(item.date_fin)}</td>
                                                <td className="rounded-r-[12px]">
                                                    ({taches.length}) taches
                                                </td>
                                            </tr>
                                        );
                                    })}
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;

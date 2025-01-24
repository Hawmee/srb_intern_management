import React, { useEffect, useRef, useState } from "react";
import { include, isArrayNotNull } from "../../../functions/Functions";
import { CopyCheck, CopyX, FileQuestion } from "lucide-react";
import { observation_stage } from "../../../utils/Observations";

function Table({ data, onSelect, selected, onValidate, onDeny }) {
    const tableContainerRef = useRef(null);
    const [selectedRow, setSelectedRow] = useState(null);

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
                                    <th> Division d'acceuil </th>
                                    <th>Observation</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {" "}
                                    </th>
                                    {/* <th> Dossiers </th> */}
                                    {/* <th className="rounded-tr-[12px] rounded-br-[12px]">
                                    </th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => {
                                        const observation = item.observation
                                        const isDisabled = (( observation !== observation_stage.en_validation))
                                        console.log(isDisabled)
                                        return(
                                        <tr
                                            key={item.id}
                                            className={`cursor:pointer h-1 rounded-[12px] hover:bg-gray-100 pt-2 ${
                                                selectedRow == item.id &&
                                                "border-r-[4px] border-blue-400 bg-gray-100"
                                            } `}
                                            onClick={() => {
                                                onSelect(item);
                                            }}
                                        >
                                            <td className="rounded-l-[12px]">
                                                {item.stagiaire.nom}
                                                {item.stagiaire.prenom}
                                            </td>
                                            <td>{item.theme}</td>
                                            <td>{item.unite.nom}</td>
                                            <td className="">
                                                <div className="flex  flex-row justify-start">
                                                    <p
                                                        className={`px-2 rounded-[20px] ${
                                                            (observation == observation_stage.abandon || observation == observation_stage.re_valide) &&
                                                            "bg-red-400 text-white"
                                                        }
                                                        ${
                                                            (observation == observation_stage.acheve )&&
                                                            "bg-blue-500 text-white"
                                                        }
                                                        ${
                                                            (observation == observation_stage.en_validation || observation == observation_stage.en_cours) &&
                                                            "bg-gray-600 text-white"
                                                        }
                                                        `}
                                                    >
                                                        {item.observation}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="rounded-r-[12px]">
                                                <div className="flex flex-row justify-center">
                                                    <button
                                                        className={`mr-6 disabled:text-red-300
                                                                ${
                                                                    item.book_link &&
                                                                    "text-red-500"
                                                                }
                                                            `}
                                                        onClick={() => {
                                                            onDeny(item);
                                                        }}
                                                        disabled={isDisabled}
                                                    >
                                                        <CopyX size={22} />
                                                    </button>
                                                    <button
                                                        className={` disabled:text-blue-300
                                                            ${item.book_link && "text-blue-500"}
                                                        `}
                                                        onClick={() => {
                                                            onValidate(item);
                                                        }}
                                                        disabled={isDisabled}
                                                    >
                                                        <CopyCheck size={22} />
                                                    </button>
                                                </div>
                                            </td>
                                            {/* <td>
                                                <div className="flex flex-row items-center justify-center text-white">
                                                    <button
                                                        className="text-blue-500 mr-2 px-3 py-1 hover:text-blue-700"
                                                        onClick={() => {
                                                            onEdit(item);
                                                        }}
                                                    >
                                                        <SquarePen size={22} />
                                                    </button>
                                                    <button className="text-gray-500 mr-2 px-3 py-1 hover:text-gray-700">
                                                        <Trash2 size={22} />
                                                    </button>
                                                </div>
                                            </td> */}
                                        </tr>
                                    )})}
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
                                    Les données de stages apparaîtront ici
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

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import {
    CheckCheck,
    EllipsisVertical,
    FileQuestion,
    StopCircle,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { isArrayNotNull } from "../../../functions/Functions";
import {
    observation_stage,
    task_observations,
} from "../../../utils/Observations";

function Table({ data, onFinish, onAbanon, onRow }) {
    const tableContainerRef = useRef(null);
    const [selectedR, setSelectedR] = useState(null);
    const stage =
        Array.isArray(data) && data.length > 0
            ? data.filter((item) => item.stagiaire)
            : null;

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <div className="px-3 mt-4 pb-2 relative text-[16px]">
            <div className="p-2 rounded-[12px] border shadow-md">
                <div
                    ref={tableContainerRef}
                    className="table_main h-[78vh] overflow-auto"
                >
                    <table className="table table-fixed text-left w-full p-[1rem] border-collapse">
                        <thead className="rounded-[20px]">
                            <tr className="sticky text-gray-700 bg-gray-100 z-12 top-0 left-0">
                                <th className="rounded-tl-[12px] rounded-bl-[12px] p-4">
                                    Stagiaire
                                </th>
                                <th className="p-4">Theme</th>
                                <th className="p-4">Status</th>
                                <th className="rounded-tr-[12px] rounded-br-[12px] p-4 w-24 ">
                                    {" "}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-2"></tr>
                            {isArrayNotNull(stage) &&
                                stage.map((item) => {
                                    const some_tasks_en_cours = isArrayNotNull(
                                        item.taches
                                    )
                                        ? item.taches.some(
                                              (task) =>
                                                  task.observation ===
                                                  task_observations.en_cours
                                          )
                                        : true;
                                    const isEnded =
                                        item.observation !==
                                        observation_stage.en_cours;
                                    const isdisabled =
                                        item.status ||
                                        some_tasks_en_cours ||
                                        isEnded;
                                    const isdisabledAbandon =
                                        item.book_link ||
                                        item.status ||
                                        item.observation !==
                                            observation_stage.en_cours;
                                    const isNew =
                                        item.isNew &&
                                        item.observation !==
                                            observation_stage.acheve &&
                                        !item.status;
                                    const theme = item.theme_definitif
                                        ? item.theme_definitif
                                        : item.theme_provisoir;
                                    return (
                                        <tr
                                            key={item.id}
                                            className={`cursor-pointer hover:bg-gray-100 ${
                                                selectedR &&
                                                selectedR.id === item.id
                                                    ? " bg-gray-100"
                                                    : ""
                                            }
                                            ${
                                                isNew &&
                                                "border-l-2 border-blue-400"
                                            }
                                            `}
                                            onClick={() => {
                                                onRow(item);
                                                setSelectedR(item);
                                            }}
                                        >
                                            <td className="rounded-l-[12px] p-4">
                                                {item.stagiaire.nom}{" "}
                                                {item.stagiaire.prenom}
                                            </td>
                                            <td className="p-4 text-blue-400">
                                                {theme}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-row justify-start">
                                                    <p
                                                        className={`px-3 py-1 rounded-full text-sm ${
                                                            item.observation ===
                                                                observation_stage.abandon ||
                                                            item.observation ===
                                                                observation_stage.re_valide
                                                                ? "bg-red-400 text-white"
                                                                : item.observation ===
                                                                  observation_stage.acheve
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-gray-600 text-white"
                                                        }`}
                                                    >
                                                        {item.observation}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="rounded-r-[12px]">
                                                <div className="z-1">
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <button className="p-1 hover:bg-gray-200 rounded-lg">
                                                                <EllipsisVertical
                                                                    size={20}
                                                                />
                                                            </button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            itemClasses={{
                                                                base: [
                                                                    "text-gray-500 , hover:!bg-gray-200 hover:!text-gray-700",
                                                                ],
                                                                title: "text-base",
                                                            }}
                                                            aria-label="Example with disabled actions"
                                                            disabledKeys={[
                                                                isdisabled &&
                                                                    "fin",
                                                                isdisabledAbandon &&
                                                                    "abandon",
                                                            ]}
                                                        >
                                                            <DropdownItem
                                                                key="fin"
                                                                startContent={
                                                                    <CheckCheck
                                                                        size={
                                                                            19
                                                                        }
                                                                    />
                                                                }
                                                                className="text-blue-500 hover:!bg-blue-100 hover:!text-blue-400"
                                                                onPress={() => {
                                                                    onFinish(
                                                                        item
                                                                    );
                                                                }}
                                                            >
                                                                Stage Achevé
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                key="abandon"
                                                                startContent={
                                                                    <StopCircle
                                                                        size={
                                                                            19
                                                                        }
                                                                    />
                                                                }
                                                                className="text-red-400 hover:!bg-red-100 hover:!text-red-500"
                                                                onPress={() => {
                                                                    onAbanon(
                                                                        item
                                                                    );
                                                                }}
                                                            >
                                                                Stage Abandonné
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
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
                                Les données de stagiaires apparaîtront ici une
                                fois disponible
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Table;

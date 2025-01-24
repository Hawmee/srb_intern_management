import { addHours, format, isBefore, parseISO, startOfMinute } from "date-fns";
import {
    CalendarCheck,
    CalendarCog,
    CalendarX,
    Ellipsis,
    EllipsisVertical,
    FileQuestion,
    Link,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { date_time, isArrayNotNull } from "../../../functions/Functions";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";

function TableEntretient({ data, onConfirm, onEdit, onCancel }) {
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
                            <thead className="rounded-[20px]">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-l-[12px]">
                                        Stagiaire
                                    </th>
                                    <th>Dossiers du stagiaire</th>
                                    <th>Date d'entretient</th>
                                    <th>Etat</th>
                                    <th className="rounded-r-[12px] w-24 "></th>
                                </tr>
                            </thead>

                            <tbody>
                                {isArrayNotNull(data) &&
                                    data.map((item) => {
                                        const date_interv = item.date_entretien;
                                        const intervDone = item.status;
                                        const isntInforme = !item.isInforme;
                                        return (
                                            <tr key={item.id} className="h-1">
                                                <td
                                                    className={
                                                        item.isNew &&
                                                        !item.date_entretien
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
                                                            className="mr-2 flex justify-center items-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                        >
                                                            <p className="mr-1">
                                                                CV
                                                            </p>{" "}
                                                            <Link size={12} />
                                                        </a>
                                                        <a
                                                            href={
                                                                item.stagiaire
                                                                    .lm_lien
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className=" flex justify-center items-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                        >
                                                            <p className="mr-1">
                                                                LM
                                                            </p>{" "}
                                                            <Link size={12} />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td>
                                                    {date_interv ? (
                                                        date_time(date_interv)
                                                    ) : (
                                                        <p>
                                                            (Choisir une date)
                                                        </p>
                                                    )}
                                                </td>
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
                                                    <div className="z-1">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <button className="bg-gray-100 p-1 rounded-lg hover:bg-gray-300">
                                                                    <EllipsisVertical size={20}/>
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
                                                                    intervDone &&
                                                                        "edit",
                                                                    (intervDone ||
                                                                        isntInforme) &&
                                                                        "refus",
                                                                    (intervDone ||
                                                                        isntInforme) &&
                                                                        "accepter",
                                                                ]}
                                                                className="!px-2"
                                                                bottomContent
                                                            >
                                                                <DropdownItem
                                                                    key="edit"
                                                                    startContent={
                                                                        <CalendarCog
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className=""
                                                                    onPress={() => {
                                                                        onEdit(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Modifier la date d'entretien
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="refus"
                                                                    startContent={
                                                                        <CalendarX
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className="text-red-500 hover:!bg-red-100 hover:!text-red-600"
                                                                    onPress={() => {
                                                                        onCancel(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Entretien refusé
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="accepter"
                                                                    startContent={
                                                                        <CalendarCheck
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className="text-blue-500 hover:!bg-blue-100 hover:!text-blue-600"
                                                                    onPress={() => {
                                                                        onConfirm(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Valider l'entretien
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

export default TableEntretient;

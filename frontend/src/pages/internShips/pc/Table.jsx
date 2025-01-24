import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { differenceInMonths } from "date-fns";
import {
    BookOpenCheck,
    CheckCheck,
    EllipsisVertical,
    FileQuestion,
    Mail,
    Printer
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
    isArrayNotNull
} from "../../../functions/Functions";
import { observation_stage } from "../../../utils/Observations";

function Table({ data, row, onRow, onBook, onPrint, onAffirm, onMail }) {
    const tableContainerRef = useRef(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px] bg-gray-50 F">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] bg-gray-50 overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px]">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Stagiaire
                                    </th>
                                    <th> Durée </th>
                                    <th>Status</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px] w-24"></th>
                                </tr>
                            </thead>

                            <tbody className="mt-4">
                                <tr className="h-2"></tr>
                                {data &&
                                    data.map((item) => {
                                        const duree_stage = differenceInMonths(
                                            item.date_fin,
                                            item.date_debut
                                        );
                                        const isRow = row
                                            ? row.id == item.id
                                            : false;
                                        const isEnded =
                                            item.observation ==
                                            observation_stage.acheve;
                                        const iscloture =
                                            item.observation ==
                                            observation_stage.cloture;
                                        const isAbandon =
                                            item.observation ==
                                            observation_stage.abandon;
                                        const isBooked = item.book_link;
                                        const affirmed = !(
                                            item.observation ==
                                            observation_stage.non_affirme
                                        );
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`h-1 cursor-pointer ${
                                                    isRow && "bg-gray-200"
                                                } `}
                                                onClick={() => {
                                                    onRow(item);
                                                }}
                                            >
                                                <td className="rounded-l-xl ">
                                                    {item.stagiaire.nom}{" "}
                                                    {item.stagiaire.prenom}{" "}
                                                </td>
                                                <td>
                                                    {Number(duree_stage) == 0
                                                        ? 1
                                                        : duree_stage}{" "}
                                                    Mois
                                                </td>
                                                <td>
                                                    <div className="flex flex-row justify-start">
                                                        <p
                                                            className={`
                                                            text-white px-4 rounded-xl
                                                            ${
                                                                (item.observation ==
                                                                    observation_stage.non_affirme ||
                                                                    item.observation ==
                                                                        observation_stage.en_validation ||
                                                                    item.observation ==
                                                                        observation_stage.a_venir ||
                                                                    item.observation ==
                                                                        observation_stage.cloturation) &&
                                                                "bg-gray-600"
                                                            }
                                                            ${
                                                                (item.observation ==
                                                                    observation_stage.en_cours ||
                                                                    item.observation ==
                                                                        observation_stage.acheve ||
                                                                    item.observation ==
                                                                        observation_stage.cloture) &&
                                                                "bg-blue-500"
                                                            }
                                                            ${
                                                                (item.observation ==
                                                                    observation_stage.re_valide ||
                                                                    item.observation ==
                                                                        observation_stage.abandon) &&
                                                                "bg-red-500"
                                                            }
                                                        `}
                                                        >
                                                            {item.observation ==
                                                            observation_stage.non_affirme
                                                                ? "A affirmer"
                                                                : item.observation}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="rounded-r-[12px]">
                                                    <div className="z-1">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <button className="p-1 hover:bg-gray-200 rounded-lg">
                                                                    <EllipsisVertical
                                                                        size={
                                                                            20
                                                                        }
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
                                                                    affirmed &&
                                                                        "affirmer",
                                                                    (!isEnded ||
                                                                        isAbandon) &&
                                                                        "communiquer",
                                                                    (!(isEnded || iscloture )||
                                                                        isAbandon) &&
                                                                        "evaluation",
                                                                    (!isEnded ||
                                                                        isBooked ||
                                                                        isAbandon) &&
                                                                        "cloturer",
                                                                ]}
                                                            >
                                                                {!affirmed && (
                                                                    <DropdownItem
                                                                        key="affirmer"
                                                                        startContent={
                                                                            <CheckCheck
                                                                                size={
                                                                                    19
                                                                                }
                                                                            />
                                                                        }
                                                                        className="text-blue-500 hover:!bg-blue-100 hover:!text-blue-400"
                                                                        onPress={() => {
                                                                            onAffirm(
                                                                                item
                                                                            );
                                                                        }}
                                                                    >
                                                                        Affirmer
                                                                        le stage
                                                                    </DropdownItem>
                                                                )}
                                                                <DropdownItem
                                                                    key="evaluation"
                                                                    startContent={
                                                                        <Printer
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className=""
                                                                    onPress={() => {
                                                                        onPrint(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Generer la
                                                                    performance
                                                                    de stage
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="communiquer"
                                                                    startContent={
                                                                        <Mail
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className=""
                                                                    onPress={() => {
                                                                        onMail(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Communiquer
                                                                    la clôture
                                                                    du stage
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="cloturer"
                                                                    startContent={
                                                                        <BookOpenCheck
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className="text-blue-500 hover:!bg-blue-100 hover:!text-blue-500"
                                                                    onPress={() => {
                                                                        onBook(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Clôturer le
                                                                    Stage
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
                                    Les données de stages apparaîtront ici une
                                    fois disponible
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

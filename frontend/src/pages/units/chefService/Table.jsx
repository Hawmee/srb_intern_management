import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import {
    CopyPlus,
    EllipsisVertical,
    PenSquare,
    Trash2
} from "lucide-react";
import React, { useEffect, useRef } from "react";

function Table({ data, onAdd, onDelete , onEdit }) {
    const tableContainerRef = useRef(null);

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
                        className="table_main h-[72vh] bg-gray-50 overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-100 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Nom
                                    </th>
                                    <th> Type</th>
                                    <th> Sur-Division </th>
                                    <th className="rounded-r-[12px] w-24">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => (
                                        <tr key={item.id} className="h-1">
                                            <td>{item.nom}</td>
                                            <td>
                                                {/* {item.isDivision ? "div" : "bur"} */}
                                                {item.Bureau
                                                    ? "Bureau"
                                                    : item.isDivision
                                                    ? "Division"
                                                    : "Bureau"}
                                            </td>
                                            <td>
                                                {item.sur_division
                                                    ? item.sur_division.nom
                                                    : "-  -  -"}
                                            </td>
                                            <td>
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
                                                        >
                                                            <DropdownItem
                                                                key="modif"
                                                                startContent={
                                                                    <PenSquare
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
                                                                Modifier
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                key="supprimer"
                                                                startContent={
                                                                    <Trash2
                                                                        size={
                                                                            19
                                                                        }
                                                                    />
                                                                }
                                                                className="text-red-400 hover:!bg-red-100 hover:!text-red-500"
                                                                onPress={() => {
                                                                    onDelete(
                                                                        item
                                                                    );
                                                                }}
                                                            >
                                                                Supprimer
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="btn_place absolute bottom-0 right-0 pb-2 pr-[8px]">
                    <button
                        className="btn_style flex flex-row items-center justify-center bg-blue-500 px-4 py-1 w-full rounded-tl-[7px] rounded-br-[7px] text-gray-100 hover:bg-blue-600 "
                        onClick={() => {
                            onAdd();
                        }}
                    >
                        <CopyPlus size={17} />
                        <p className="ml-1">Ajouter</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Table;

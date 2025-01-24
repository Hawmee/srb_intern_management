import {
    CheckCheck,
    CopyPlus,
    Ellipsis,
    EllipsisVertical,
    Eye,
    File,
    FileQuestion,
    FileText,
    Mail,
    Printer,
    SquarePen,
    SquareX,
    Trash2,
    UserCheck,
    UserPen,
    UserX,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { isArrayNotNull } from "../../../functions/Functions";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";

function Table({ data, onRow, onInform, onAttestation, onCollected }) {
    const tableContainerRef = useRef(null);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    console.log(data);

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px]  ">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Numero
                                    </th>
                                    <th> Stagiaire </th>
                                    <th> Division d'acceuil</th>
                                    <th> Attestation </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px] w-24"></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="h-4"></tr>
                                {isArrayNotNull(data) &&
                                    data.map((item) => {
                                        const stagiaire = item.stagiaire;
                                        const division = item.unite;
                                        const attestation = item.attestation;
                                        const isSelect = selected
                                            ? selected.id == item.id
                                            : false;
                                        const disabledAttestation =
                                            !item.observaion == "Achevé";
                                        const disabledMail =
                                            !attestation.status ||
                                            attestation.isCollected;
                                        // const status = attestation.status
                                        const isDisabledFournie =
                                            !attestation.status ||
                                            attestation.isCollected;
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`h-1 cursor-pointer ${
                                                    isSelect && "bg-gray-200"
                                                }`}
                                                onClick={() => {
                                                    setSelected(item);
                                                    onRow(item);
                                                }}
                                            >
                                                <td className="rounded-l-[12px]">
                                                    {!attestation.isCollected
                                                        ? attestation.numero
                                                        : "- - - "}
                                                </td>
                                                <td>
                                                    {stagiaire.nom}{" "}
                                                    {stagiaire.prenom}
                                                </td>
                                                <td> {division.nom} </td>
                                                <td>
                                                    <div className="flex flex-row text-white">
                                                        {attestation ? (
                                                            attestation.isCollected ? (
                                                                <p className="bg-blue-500 px-3 rounded-xl">
                                                                    livré
                                                                </p>
                                                            ) : attestation.status ? (
                                                                <p className="bg-blue-500 px-3 rounded-xl">
                                                                    Pret
                                                                </p>
                                                            ) : (
                                                                <p className="bg-gray-600 px-3 rounded-xl">
                                                                    En attente
                                                                </p>
                                                            )
                                                        ) : (
                                                            <p>---</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="rounded-r-[12px]">
                                                    <div className="flex flex-row items-center justify-start ">
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <button
                                                                    className="bg-gray-100 rounded-lg p-1 hover:bg-gray-200"
                                                                    onClick={() => {
                                                                        setSelected(
                                                                            item
                                                                        );
                                                                        onRow(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
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
                                                                    disabledAttestation &&
                                                                        "print",
                                                                    disabledMail &&
                                                                        "mail",
                                                                    isDisabledFournie &&
                                                                        "deliver",
                                                                ]}
                                                                className="!px-2"
                                                                bottomContent
                                                            >
                                                                <DropdownItem
                                                                    key="print"
                                                                    startContent={
                                                                        <Printer
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className=""
                                                                    onPress={() => {
                                                                        onAttestation(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Generer
                                                                    Attestation
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="mail"
                                                                    startContent={
                                                                        <Mail
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className=""
                                                                    onPress={() => {
                                                                        onInform(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Informer le
                                                                    Stagiaire
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="deliver"
                                                                    startContent={
                                                                        <CheckCheck
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className="text-blue-500 hover:!bg-blue-100 hover:!text-blue-600"
                                                                    onPress={() => {
                                                                        onCollected(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Attestation
                                                                    Fournie
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
                                    Les données d'attesttions apparaîtront ici
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

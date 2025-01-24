import { CheckCheck, Ellipsis, EllipsisVertical, Eye, FileQuestion, Info } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { isArrayNotNull, today_string } from "../../../functions/Functions";
import { pdf } from "@react-pdf/renderer";
import AttesationPDF from "../../../components/Files/AttesationPDF";
import { differenceInMonths } from "date-fns";
import n2words from "n2words";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";

function Table({ data, onValidate, onInfo }) {
    const tableContainerRef = useRef(null);

    const generate = async (data) => {
        const today = today_string();
        const pdfBlob = await pdf(
            <AttesationPDF isAttestation={true} attestation={data} />
        ).toBlob();
        const url_pdf = URL.createObjectURL(pdfBlob);

        const printWindow = window.open(url_pdf);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.onafterprint = () => printWindow.close();
            };
        }
    };

    const handleView = (item) => {
        if (item) {
            const attestation = item;
            const stage = attestation.stage;
            const stagiaire = stage.stagiaire;
            const duree = differenceInMonths(stage.date_fin, stage.date_debut);
            const lettre_duree = n2words(duree, { lang: "fr" });
            const info = {
                numero: attestation.numero,
                stagiaire: `${stagiaire.nom} ${stagiaire.prenom}`,
                lettre_duree: lettre_duree,
                duree: duree,
            };
            generate(info);
        }
    };

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px]">
                <div className="p-2 rounded-[12px] border shadow-md">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh]  overflow-auto"
                    >
                        <table className="table table-fixed text-left w-full p-[1rem] border-collapse">
                            <thead className="rounded-[20px]">
                                <tr className="sticky text-gray-700 bg-gray-100 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Numero
                                    </th>
                                    <th>Stagiaire</th>
                                    <th>Division D'acceuil</th>
                                    <th>Status</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px] w-28"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="h-4"></tr>
                                {isArrayNotNull(data) &&
                                    data.map((item) => {
                                        const stage = item.stage;
                                        const stagiaire = item.stage.stagiaire;
                                        const unite = item.stage.unite;
                                        const isDisabled = item.status;
                                        return (
                                            <tr key={item.id} className="h-1">
                                                <td>{item.numero}</td>
                                                <td>
                                                    {stagiaire.nom}{" "}
                                                    {stagiaire.prenom}
                                                </td>
                                                <td>{unite.nom}</td>
                                                <td>
                                                    <div className="flex flex-row justify-start">
                                                        {item.status ? (
                                                            <p className="bg-blue-600 text-white px-3 py-1 rounded-[20px]">
                                                                Fournie
                                                            </p>
                                                        ) : (
                                                            <p className="bg-red-500 text-white px-3 rounded-[20px]">
                                                                Non founrie
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex flex-row items-center justify-center">
                                                        <button className="mr-6 hover:text-gray-500" 
                                                            onClick={()=>{
                                                                onInfo(item)
                                                            }}
                                                        >
                                                            <Info size={20} />
                                                        </button>
                                                        <Dropdown>
                                                            <DropdownTrigger>
                                                                <button className="p-1 hover:bg-gray-200 rounded-lg">
                                                                    <EllipsisVertical size={20} />
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
                                                                disabledKeys={isDisabled ?[
                                                                    "view",
                                                                    "validate",
                                                                ] : []}
                                                            >
                                                                <DropdownItem
                                                                    key="view"
                                                                    startContent={
                                                                        <Eye
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className=""
                                                                    onPress={()=>{handleView(item)}}
                                                                >
                                                                    Voir
                                                                    l'apercu
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    key="validate"
                                                                    startContent={
                                                                        <CheckCheck
                                                                            size={
                                                                                19
                                                                            }
                                                                        />
                                                                    }
                                                                    className="text-blue-500 hover:!bg-blue-100 hover:!text-blue-600"
                                                                    onPress={()=>{onValidate(item)}}
                                                                >
                                                                    Affirmer
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
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

import {
    BadgeAlert,
    BadgeCheck,
    CopyPlus,
    UserCheck,
    UserPen,
    UserX,
    UserX2,
} from "lucide-react";
import React from "react";

function Table({ data, onValidate }) {

    console.log(data)

    return (
        <>
            <div className="px-2 pb-2 relative">
                <div className=" p-2 rounded-[12px] border shadow-md">
                    <div className="table_main h-[78vh]   overflow-auto">
                        <table className="table  text-left  w-full p-[1rem] b border-collapse">
                            <thead className="rounded-[20px]">
                                <tr className="sticky text-gray-700 bg-gray-100 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Matricule
                                    </th>
                                    <th> Nom & Prenom </th>
                                    <th> Type </th>
                                    <th> Unité de travail </th>
                                    <th> Validité du compte </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => {
                                        const isDisabledValidate = item.status
                                        return(
                                        <tr key={item.id}>
                                            <td
                                                className={
                                                    item.isNew
                                                        ? "border-l-[5px] border-blue-400"
                                                        : ""
                                                }
                                            >
                                                {item.matricule}
                                            </td>
                                            <td>
                                                {item.nom} {item.prenom}
                                            </td>
                                            <td>
                                                {item.isChefUnit
                                                    ? "Chef"
                                                    : item.isPersCellule ||
                                                      item.isPersSecretariat
                                                    ? "Personnel"
                                                    : ""}
                                            </td>
                                            <td>
                                                {item.unite
                                                    ? item.unite.nom
                                                    : "-  -  -"}
                                            </td>
                                            <td>
                                                {item.status ? (
                                                    <div className="text-blue-500 flex flex-row items-center">
                                                        <BadgeCheck />{" "}
                                                        <p className="ml-2">
                                                            validé
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="text-red-400 flex flex-row items-center">
                                                        <BadgeAlert />
                                                        <p className="ml-2">
                                                            non validé
                                                        </p>
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex flex-row items-center justify-start text-white">
                                                    <button
                                                        className=" text-blue-500 disabled:text-blue-300 hover:text-blue-600 "
                                                        onClick={() => {
                                                            onValidate(item);
                                                        }}
                                                        disabled={isDisabledValidate}
                                                    >
                                                        <UserCheck />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )})}
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

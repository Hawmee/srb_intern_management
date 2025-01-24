import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import MainContainer from "../../../components/containers/MainContainer";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import {
    filterObjSame,
    isArray,
    isArrayNotNull,
} from "../../../functions/Functions";
import Add from "./forms/Add";
import Table from "./Table";
import Edit from "./forms/Edit";
import Delete from "./forms/Delete";
import { Search } from "lucide-react";
import { useDisclosure } from "@nextui-org/react";

function PS_demande({ data }) {
    const current_user = useSelector((state) => state.currentUser.value);
    // const unite_id = current_user.unite.id;
    // const methodAdd = useForm();
    // const methodEdit = useForm();
    // const [add, setAdd] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);

    const add = useDisclosure();
    const edit = useDisclosure();
    const del = useDisclosure();

    const handleAdd = () => {
        if (!add.isOpen) {
            add.onOpen();
        } else {
            add.onClose();
        }
    };

    const handleEdit = (item) => {
        if (item) {
            setSelected(item);
            edit.onOpen();
        } else {
            edit.onClose();
        }
    };

    const handleDelete = (item) => {
        if (item) {
            setSelected(item);
            del.onOpen();
        } else {
            del.onClose();
        }
    };

    // useEffect(() => {
    //     if (!offre_units) {
    //         setFilteredData([]);
    //         return;
    //     }

    //     const filtered = data.filter((item) => {
    //         const stages = item.nombre_stagiaire;
    //         const statusMatch =
    //             selectedStatus == "all" ||
    //             (selectedStatus == "dispo" ? stages > 0 : stages <= 0);

    //         if (!searchTerm) return statusMatch;

    //         const searchLower = searchTerm.toLowerCase();
    //         const unite = item.unite;
    //         const mention = item.mention_requise;
    //         const nameMatch = item.nom?.toLowerCase().includes(searchLower);
    //         const mentionMatch = mention.toLowerCase().includes(searchLower);
    //         const division = unite.nom?.toLowerCase().includes(searchLower);

    //         return statusMatch && (nameMatch || mentionMatch || division);
    //     });

    //     console.log(offers);

    //     setFilteredData(filtered);
    // }, [data, selectedStatus, searchTerm]);

    // useEffect(() => {
    //     if (offers) {
    //         const dispo_offre = offre_units.some(
    //             (item) => item.nombre_stagiaire > 0
    //         );

    //         if (dispo_offre) {
    //             setSelectedStatus("dispo");
    //         } else {
    //             setSelectedStatus("all");
    //         }
    //     }
    // }, [data]);
    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 border-b-[2px] mb-4">
                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher un element"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                    }}
                                />
                                <div className="mr-1  px-1 flex flex-row items-center cursor-pointer">
                                    <Search size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SearchContainer>
                <div>
                    {/* <Card handleAdd={handleAdd} data={offre_units} /> */}
                    <Table
                        data={data}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </MainContainer>

            <PopUpContainer isOpen={add.isOpen} onOpenChange={add.onOpenChange}>
                <Add onAdd={handleAdd} />
            </PopUpContainer>

            <PopUpContainer isOpen={edit.isOpen} onOpenChange={edit.onOpenChange}>
                <Edit data={selected} onEdit={handleEdit} />
            </PopUpContainer>
            <PopUpContainer isOpen={del.isOpen} onOpenChange={del.onOpenChange}>
                <Delete data={selected} onDelete={handleDelete} />
            </PopUpContainer>
        </>
    );
}

export default PS_demande;

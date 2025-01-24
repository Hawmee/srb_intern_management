import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import New from "./forms/New";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Edit from "./forms/Edit";
import { useForm } from "react-hook-form";
import Delete from "./forms/Delete";
import Docs from "./forms/Docs";
import { Search } from "lucide-react";
import { observation_stagiaire } from "../../../utils/Observations";
import { useDisclosure } from "@nextui-org/react";

function PersIntern({ interns }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [selected_intern, setSelected_intern] = useState(null);
    const methodEdit = useForm();
    const methodDocs = useForm();
    const { reset } = methodEdit;

    const new_intern = useDisclosure();
    const edit_intern = useDisclosure();
    const delete_intern = useDisclosure();
    const docs = useDisclosure();

    const handle_new = () => {
        if (new_intern.isOpen) {
            new_intern.onClose();
        } else {
            new_intern.onOpen();
        }
    };

    const handle_edit = (item) => {
        if (item) {
            edit_intern.onOpen();
            setSelected_intern(item);
            reset({
                nom: item.nom,
                prenom: item.prenom,
                email: item.email,
                phone: item.phone,
                filiere: item.filiere,
                etablissement: item.etablissement,
                cv_lien: null,
                lm_lien: null,
            });
        } else {
            edit_intern.onClose();
        }
    };

    const handle_delete = (item) => {
        if (item) {
            setSelected_intern(item);
            delete_intern.onOpen();
        } else {
            delete_intern.onClose();
        }
    };

    const handle_docs = (item) => {
        if (item) {
            setSelected_intern(item);
            docs.onOpen();
        } else {
            docs.onClose();
        }
    };

    useEffect(() => {
        if (!interns) {
            setFilteredData([]);
            return;
        }

        const filtered = interns.filter((item) => {
            const statusMatch =
                selectedStatus == "all" ||
                (selectedStatus == "Postulant"
                    ? item.observation == observation_stagiaire.postulant
                    : selectedStatus == "En cours de stage"
                    ? item.observation == observation_stagiaire.en_stage
                    : selectedStatus == "A entretenir"
                    ? item.observation == observation_stagiaire.a_entretenir
                    : item.observation == observation_stagiaire.finalisation);

            if (!searchTerm) return statusMatch;

            const searchLower = searchTerm.toLowerCase();
            const nameMatch =
                item.nom?.toLowerCase().includes(searchLower) ||
                item.prenom?.toLowerCase().includes(searchLower);
            const niveau = item.niveau?.toLowerCase().includes(searchLower);
            const allNameMatch = (item.nom + " " + item.prenom)
                .toLowerCase()
                .includes(searchLower);
            const filiere = item.filiere?.toLowerCase().includes(searchLower);

            return (
                statusMatch && (nameMatch || allNameMatch || filiere || niveau)
            );
        });

        console.log(interns);
        console.log(observation_stagiaire);

        setFilteredData(filtered);
    }, [interns, selectedStatus, searchTerm]);

    useEffect(() => {
        if (interns) {
            const postulant = interns.some(
                (item) => item.observation == observation_stagiaire.postulant
            );
            if (postulant) {
                setSelectedStatus("Postulant");
            } else {
                setSelectedStatus("all");
            }
        }
    }, [interns]);

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 border-b-[2px] mb-4">
                        <div className="min-w-56 flex flex-row justify-center items-end h-full">
                            <select
                                name=""
                                id=""
                                className="px-2 py-2 border-[2px] border-gray-400  rounded-[12px] cursor-pointer outline-none"
                                value={selectedStatus}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                            >
                                <option value="all">Tous</option>
                                <option value="Postulant">Postulant</option>
                                <option value="A entretenir">
                                    A entretenir
                                </option>
                                <option value="En cours de stage">
                                    En cours de stage
                                </option>
                                <option value="Anciens">Anciens</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(stagiaire , niveau ,...)"
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
                    <Table
                        data={filteredData}
                        onAdd={handle_new}
                        onEdit={handle_edit}
                        onDelete={handle_delete}
                        onDocs={handle_docs}
                    />
                </div>
            </MainContainer>
            <PopUpContainer
                isOpen={new_intern.isOpen}
                onOpenChange={new_intern.onOpenChange}
            >
                <New handle_new={handle_new} />
            </PopUpContainer>

            <PopUpContainer
                isOpen={edit_intern.isOpen}
                onOpenChange={edit_intern.onOpenChange}
            >
                <Edit
                    handle_edit={handle_edit}
                    method={methodEdit}
                    data={selected_intern}
                />
            </PopUpContainer>
            <PopUpContainer
                isOpen={delete_intern.isOpen}
                onOpenChange={delete_intern.onOpenChange}
            >
                <Delete handle_delete={handle_delete} data={selected_intern} />
            </PopUpContainer>
            <PopUpContainer
                isOpen={docs.isOpen}
                onOpenChange={docs.onOpenChange}
            >
                <Docs
                    handle_docs={handle_docs}
                    data={selected_intern}
                    method={methodDocs}
                />
            </PopUpContainer>
        </>
    );
}

export default PersIntern;

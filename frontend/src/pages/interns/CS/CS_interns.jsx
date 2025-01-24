import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { useForm } from "react-hook-form";
import { Info, Search } from "lucide-react";
import { observation_stagiaire } from "../../../utils/Observations";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Interview from "./forms/Interview";
import Stagiaire from "./cards/Stagiaire";
import Stage_demande from "./cards/Stage_demande ";
import { useDisclosure } from "@nextui-org/react";

function CS_interns({ interns }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [row, setRow] = useState(null);

    const interview = useDisclosure();

    const handleInterview = (item) => {
        if (item) {
            setSelected(item);
            interview.onOpen();
        } else {
            interview.onClose();
        }
    };

    const handleRow = (item) => {
        if (item) {
            setRow(item);
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
                        <div className="flex flex-row justify-center items-end h-full">
                            <select
                                className="px-2 py-2 border-[2px] border-gray-400 rounded-[12px] cursor-pointer outline-none"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="all">Tous</option>
                                <option value="Postulant">Postulant</option>
                                <option value="A entretenir">A entretenir</option>
                                <option value="En cours de stage">En cours de stage</option>
                                <option value="Fin">Anciens</option>
                            </select>
                        </div>

                        <div className="flex flex-row flex-1 h-full justify-end items-end">
                            <div className="flex flex-row text-gray-600 py-2 rounded-2xl bg-white px-2 border-2 ">
                                <input
                                    type="text"
                                    placeholder="Rechercher (stagiaire , ... )"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="mr-1 px-1 flex flex-row items-center cursor-pointer">
                                    <Search size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SearchContainer>

                <div className="flex flex-row">
                    <div className="w-[55vw] mr-2">
                        <Table
                            data={filteredData}
                            onInterview={handleInterview}
                            onRow={handleRow}
                            row={row}
                        />
                    </div>
                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px]">
                        <div className="card h-full overflow-auto px-2">
                            {row ? (
                                <>
                                    <div className="mb-4 pt-4">
                                        <Stage_demande data={row} />
                                    </div>
                                    <div>
                                        <Stagiaire data={row} />
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 font-semibold">
                                    <div className="text-2xl flex flex-row items-center font-bold">Details <Info size={25} className="ml-2"/> </div>
                                    Sélectionnez un stagiaire pour afficher les détails.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MainContainer>

            <PopUpContainer isOpen={interview.isOpen} onOpenChange={interview.onOpenChange}>
                <Interview data={selected} onInterview={handleInterview} />
            </PopUpContainer>
        </>
    );
}

export default CS_interns;

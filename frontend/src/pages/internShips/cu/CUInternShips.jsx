import React, { useEffect, useState } from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import { useForm } from "react-hook-form";
import Abandon from "./forms/Abandon";
import Finish from "./forms/FInish";
import Details from "./cards/Details";
import Interns from "./cards/Interns";
import Tasks from "./cards/Tasks";
import { Search } from "lucide-react";
import { isArrayNotNull, isBeforeEqual } from "../../../functions/Functions";
import { Stage } from "../../../services/stage";
import { observation_stage } from "../../../utils/Observations";
import { useDisclosure } from "@nextui-org/react";

export const stage_status = [
    { nom: "Tous", value: "all" },
    { nom: "En cours", value: "En Cours" },
    { nom: "Achevé", value: "Achevé" },
    { nom: "Annulé", value: "Annulé" },
    { nom: "Cloturé", value: "Cloturé" },
];

function CUInternShips({ data }) {
    // States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [row, setRow] = useState(null);
    const [stagiaire, setStagiaire] = useState(null);
    const [stage, setStage] = useState(null);
    const abandon = useDisclosure();
    const fin = useDisclosure();

    const methodEdit = useForm();

    const handleFin = (item) => {
        if (item) {
            setSelected(item);
            fin.onOpen()
        }else{
            fin.onClose()
        }
    };

    const handleAbandon = (item) => {
        if (item) {
            setSelected(item);
            abandon.onOpen();
        } else {
            abandon.onClose();
        }
    };

    const handleRow = (item) => {
        if (item) {
            setRow(item);
            setStage(item);
            setStagiaire(item.stagiaire);
        }
    };

    const mark_new_viewed = async (data) => {
        try {
            const viewed = Stage.viewed(data);
            if (viewed) {
                console.log("real");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const stage_en_cours = async (data) => {
        try {
            const cours_stage = Stage.en_cours(data);
            if (cours_stage) {
                console.log("real");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const stage = data;
        const stages_id = isArrayNotNull(stage)
            ? stage.map((item) => item.id)
            : null;
        const some_news = isArrayNotNull(stage)
            ? stage.some((item) => item.isNew)
            : false;
        const some_a_venir = isArrayNotNull(stage)
            ? stage.some((item) => {
                  const observation_matching =
                      item.observation == observation_stage.a_venir;
                  const date_matching = isBeforeEqual(
                      item.date_debut,
                      new Date()
                  );
                  return observation_matching && date_matching;
              })
            : false;
        const body = {
            ids: stages_id,
        };
        if (some_news) {
            setTimeout(() => {
                mark_new_viewed(body);
            }, 3000);
        }

        if (some_a_venir) {
            stage_en_cours(body);
        }
    }, [data]);

    useEffect(() => {
        if (!data) {
            setFilteredData([]);
            return;
        }

        const filtered = data.filter((item) => {
            // Status filter
            const statusMatch =
                selectedStatus == "all" || item.observation == selectedStatus;

            // Search filter
            if (!searchTerm) return statusMatch;

            const searchLower = searchTerm.toLowerCase();
            const nameMatch =
                item.stagiaire?.nom?.toLowerCase().includes(searchLower) ||
                item.stagiaire?.prenom?.toLowerCase().includes(searchLower);
            const themeMatch = item.theme?.toLowerCase().includes(searchLower);

            return statusMatch && (nameMatch || themeMatch);
        });

        setFilteredData(filtered);
    }, [data, selectedStatus, searchTerm]);

    useEffect(() => {
        if (stagiaire) {
            const stage_id = stage.id;
            const matching_data = isArrayNotNull(data)
                ? data.find((item) => Number(item.id) == Number(stage_id))
                : stage;
            setStage(matching_data);
        }
    }, [data, stagiaire]);

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 border-b-[2px] mb-4">
                        <div className="flex flex-row justify-center items-end h-full">
                            <select
                                value={selectedStatus}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                                className="px-2 py-2 border-[2px] border-gray-400 rounded-[12px] cursor-pointer outline-none w-[8vw]"
                            >
                                {stage_status.map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.index}
                                    >
                                        {option.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-row flex-1 h-full justify-end items-end">
                            <div className="flex flex-row text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher (stagiaire, theme)"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <div className="mr-1 px-1 flex flex-row items-center">
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
                            onFinish={handleFin}
                            onAbanon={handleAbandon}
                            onRow={handleRow}
                        />
                    </div>

                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px]">
                        <div className="card h-full overflow-auto px-2">
                            <div className="mb-6">
                                <Tasks data={stage} />
                            </div>
                            <div className="mb-6">
                                <Details data={stage} />
                            </div>
                            <div className="mb-6">
                                <Interns data={stagiaire} />
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>

            <PopUpContainer
                isOpen={abandon.isOpen}
                onOpenChange={abandon.onOpenChange}
            >
                <Abandon onAbandon={handleAbandon} data={selected} />
            </PopUpContainer>

            <PopUpContainer isOpen={fin.isOpen} onOpenChange={fin.onOpenChange}>
                <Finish data={selected} onFinish={handleFin} />
            </PopUpContainer>
        </>
    );
}

export default CUInternShips;

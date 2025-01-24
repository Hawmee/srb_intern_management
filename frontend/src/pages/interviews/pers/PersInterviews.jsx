import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import MainContainer from "../../../components/containers/MainContainer";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import { isArray } from "../../../functions/Functions";
import IsInformed from "./forms/IsInformed";
import Mail from "./forms/Mail";
import Table from "./Table";
import { useDisclosure } from "@nextui-org/react";

function PersInterviews({ interviews }) {
    const url = useSelector((state) => state.backendUrl.value);
    const isNewInterviews =
        isArray(interviews) &&
        interviews.some((interview) => interview.isNew == true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [selected, setSelected] = useState(null);
    const methodMail = useForm();

    const mailModal = useDisclosure();
    const informModal = useDisclosure();

    const handleMail = (item) => {
        if (item) {
            setSelected(item);
            mailModal.onOpen();
        } else {
            mailModal.onClose();
        }
    };

    const handleInform = (item) => {
        if (item) {
            setSelected(item);
            informModal.onOpen();
        } else {
            informModal.onClose();
        }
    };

    const nonInformed_interv = interviews.filter(
        (interview) => interview.date_entretien
    );

    const mark_viewed = async () => {
        try {
            const viewed = await axios.patch(`${url}/markviewed/entretient`);
            if (viewed) {
                console.log("VIewed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isNewInterviews) {
            setTimeout(() => {
                mark_viewed();
            }, 5000);
        }
    }, [isNewInterviews]);

    useEffect(() => {
        if (!interviews) {
            setFilteredData([]);
            return;
        }

        const filtered = interviews.filter((item) => {
            const statusMatch =
                selectedStatus == "all" ||
                (selectedStatus == "!informe"
                    ? !item.isInforme
                    : item.isInforme);

            if (!searchTerm) return statusMatch;

            const searchLower = searchTerm.toLowerCase();
            const stagiaire = item.stagiaire;
            const nameMatch =
                stagiaire.nom?.toLowerCase().includes(searchLower) ||
                stagiaire.prenom?.toLowerCase().includes(searchLower);
            const allNameMatch = (stagiaire.nom + " " + stagiaire.prenom)
                .toLowerCase()
                .includes(searchLower);
            const division = unite.nom?.toLowerCase().includes(searchLower);

            return statusMatch && (nameMatch || allNameMatch || division);
        });

        setFilteredData(filtered);
    }, [interviews, selectedStatus, searchTerm]);

    useEffect(() => {
        if (interviews) {
            const interv = interviews;
            const non_informe = interv.some((item) => !item.isInforme);
            if (non_informe) {
                setSelectedStatus("!informe");
            } else {
                setSelectedStatus("informe");
            }
        }
    }, [interviews]);

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 border-b-[2px] mb-4">
                        <div className=" flex flex-row justify-center items-end h-full">
                            <select
                                name=""
                                id=""
                                className="px-2 py-2 border-[2px] border-gray-400  rounded-[12px] cursor-pointer outline-none"
                                value={selectedStatus}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                            >
                                <option value="!informe">Non Informé</option>
                                <option value="informe">Informé</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(stagiaire , date , ...)"
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
                        onMail={handleMail}
                        onInform={handleInform}
                    />
                </div>
            </MainContainer>
            <PopUpContainer
                isOpen={mailModal.isOpen}
                onOpenChange={mailModal.onOpenChange}
            >
                <Mail
                    handleMail={handleMail}
                    method={methodMail}
                    data={selected}
                />
            </PopUpContainer>

            <PopUpContainer
                isOpen={informModal.isOpen}
                onOpenChange={informModal.onOpenChange}
            >
                <IsInformed handleInform={handleInform} data={selected} />
            </PopUpContainer>
        </>
    );
}

export default PersInterviews;

import React, { useEffect, useState } from "react";
import Table from "./Table";
import SearchContainer from "../../../components/containers/SearchContainer";
import MainContainer from "../../../components/containers/MainContainer";
import { Search } from "lucide-react";
import { filterObjSame, isArrayNotNull } from "../../../functions/Functions";
import InternShip from "./cards/InternShip";
import Interns from "./cards/Interns";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Generate from "./forms/Generate";
import Inform from "./forms/Inform";
import Collected from "./forms/Collected";
import { useDisclosure } from "@nextui-org/react";

function PersAttestations({ data }) {
    const validatedStage = isArrayNotNull(data)
        ? data.filter((item) => item.attestation)
        : null;
    console.log(validatedStage);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [row, setRow] = useState(null);
    const [stagiaire, setStagiaire] = useState(null);
    const [selected, setSelected] = useState(null);
    const [attestation, setAttestation] = useState(false);
    const [inform, setInform] = useState(false);
    const [collected, setCollected] = useState(false);

    const attestationDisclosure = useDisclosure();
    const mailModal = useDisclosure();
    const collectModal = useDisclosure();

    const handleAttestation = (item) => {
        if (item) {
            setSelected(item);
            attestationDisclosure.onOpen();
        } else {
            attestationDisclosure.onClose();
        }
    };

    const handleInform = (item) => {
        if (item) {
            setSelected(item);
            mailModal.onOpen();
        } else {
            mailModal.onClose();
        }
    };

    const handleCollected = (item) => {
        if (item) {
            setSelected(item);
            collectModal.onOpen();
        } else {
            collectModal.onClose();
        }
    };

    const handleRow = (item) => {
        if (item) {
            setRow(item);
        }
    };

    useEffect(() => {
        if (row) {
            setStagiaire(row.stagiaire);
        }
    }, [row]);

    useEffect(() => {
        if (!data) {
            setFilteredData([]);
            return;
        }

        const filtered = validatedStage.filter((item) => {
            const attestation = item.attestation;
            const statusMatch =
                selectedStatus == "all" ||
                (selectedStatus == "En Attente"
                    ? !attestation.status &&
                      !attestation.isInforme &&
                      !attestation.isCollected
                    : selectedStatus == "Pretes"
                    ? attestation.status && !attestation.isCollected
                    : attestation.isCollected);

            if (!searchTerm) return statusMatch;

            const searchLower = searchTerm.toLowerCase();
            const stage = item;
            const nameMatch =
                stage.stagiaire?.nom?.toLowerCase().includes(searchLower) ||
                stage.stagiaire?.prenom?.toLowerCase().includes(searchLower);
            const numero = attestation.numero
                ?.toLowerCase()
                .includes(searchLower);
            const allNameMatch = (
                stage.stagiaire.nom +
                " " +
                stage.stagiaire.prenom
            )
                .toLowerCase()
                .includes(searchLower);
            const themeMatch = stage.theme?.toLowerCase().includes(searchLower);
            const division = stage.untie?.nom
                ?.toLowerCase()
                .includes(searchLower);

            return (
                statusMatch &&
                (nameMatch || allNameMatch || themeMatch || division || numero)
            );
        });

        console.log(data);

        setFilteredData(filtered);
    }, [data, selectedStatus, searchTerm]);

    useEffect(() => {
        if (data) {
            const en_attente = validatedStage.some(
                (item) =>
                    !item.attestation.status &&
                    !item.attestation.isInforme &&
                    !item.attestation.isCollected
            );
            const pret = validatedStage.some(
                (item) =>
                    item.attestation.status && !item.attestation.isCollected
            );
            if (en_attente) {
                setSelectedStatus("En Attente");
            } else if (pret) {
                setSelectedStatus("Pretes");
            } else {
                setSelectedStatus("all");
            }
        }
    }, [data]);

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
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                    console.log(selectedStatus);
                                }}
                            >
                                <option value="all">Tous</option>
                                <option value="En Attente">En attentes</option>
                                <option value="Pretes">Pretes</option>
                                <option value="Entretient">Livrées</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(stagiaire , numero , ...)"
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
                <div className="flex flex-row">
                    <div className="w-[55vw] mr-2">
                        <Table
                            data={filteredData}
                            onRow={handleRow}
                            onAttestation={handleAttestation}
                            onInform={handleInform}
                            onCollected={handleCollected}
                        />
                    </div>
                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px]">
                        <div className=" card h-full overflow-auto px-2">
                            <div className="mb-3">
                                <InternShip data={row} />
                            </div>
                            <div className="mb-3">
                                <Interns data={stagiaire} />
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>

            <PopUpContainer
                isOpen={attestationDisclosure.isOpen}
                onOpenChange={attestationDisclosure.onOpenChange}
            >
                <Generate
                    data={selected}
                    handleAttestation={handleAttestation}
                />
            </PopUpContainer>

            <PopUpContainer
                isOpen={mailModal.isOpen}
                onOpenChange={mailModal.onOpenChange}
            >
                <Inform onInform={handleInform} data={selected} />
            </PopUpContainer>

            <PopUpContainer
                isOpen={collectModal.isOpen}
                onOpenChange={collectModal.onOpenChange}
            >
                <Collected data={selected} onCollected={handleCollected} />
            </PopUpContainer>
        </>
    );
}

export default PersAttestations;

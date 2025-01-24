import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { Search } from "lucide-react";
import Print from "./forms/Print";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Validate from "./forms/Validate";
import { useDisclosure } from "@nextui-org/react";
import DrawerContainer from "../../../components/containers/DrawerContainer";
import Details from "./drawer/Details";

function CSAttestation({ data }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [validate, setValidate] = useState(false);

    const printModal = useDisclosure();
    const validateModal = useDisclosure();
    const info = useDisclosure()

    const hanldePrint = (item) => {
        if (item) {
            setSelected(item);
            printModal.onOpen();
        } else {
            printModal.onClose();
        }
    };

    const handleValidate = (item) => {
        if (item) {
            setSelected(item);
            validateModal.onOpen();
        } else {
            validateModal.onClose();
        }
    };

    const handleInfo = (item) =>{
        info.onOpen()
        if(item){
            setSelected(item)
            console.log(item)
        }else{
            info.onClose()
        }
    }

    useEffect(() => {
        if (!data) {
            setFilteredData([]);
            return;
        }

        const filtered = data.filter((item) => {
            const statusMatch =
                selectedStatus == "all" ||
                (selectedStatus == "Demande"
                    ? !item.status && !item.isCollected
                    : item.status);

            if (!searchTerm) return statusMatch;

            const searchLower = searchTerm.toLowerCase();
            const stage = item.stage;
            const nameMatch =
                stage.stagiaire?.nom?.toLowerCase().includes(searchLower) ||
                stage.stagiaire?.prenom?.toLowerCase().includes(searchLower);
            const numero = item.numero?.toLowerCase().includes(searchLower);
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
            const demande = data.some((item) => !item.status);
            if (demande) {
                setSelectedStatus("Demande");
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
                                <option value="Demande">
                                    Demande d'attestation
                                </option>
                                <option value="Livrée">Livrées</option>
                            </select>
                        </div>
                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(nom , division , numero)"
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
                        onPrint={hanldePrint}
                        onInfo={handleInfo}
                        onValidate={handleValidate}
                    />
                </div>
            </MainContainer>

            <PopUpContainer
                isOpen={printModal.isOpen}
                onOpenChange={printModal.onOpenChange}
            >
                <Print onPrint={hanldePrint} data={selected} />
            </PopUpContainer>

            <PopUpContainer
                isOpen={validateModal.isOpen}
                onOpenChange={validateModal.onOpenChange}
            >
                <Validate data={selected} onValidate={handleValidate} />
            </PopUpContainer>
            <DrawerContainer
                isOpen={info.isOpen}
                onOpenChange={info.onOpenChange}
                onClose={info.onClose}
            >
                <Details 
                    attestation={selected}
                    fournir={handleValidate}
                />
            </DrawerContainer>
        </>
    );
}

export default CSAttestation;

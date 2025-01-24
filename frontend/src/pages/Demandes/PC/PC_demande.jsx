import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import MainContainer from "../../../components/containers/MainContainer";
// import PopUpContainer from "../../../components/containers/PopUpContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import { filterObjSame, isArray, isArrayNotNull } from "../../../functions/Functions";
import Table from "./Table";
import { Search } from "lucide-react";
import { demande } from "../../../services/demande";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import NewStagiaire from "./forms/NewStagiaire";
import { useDisclosure } from "@nextui-org/react";

function PC_demande({ data }) {
    const current_user = useSelector((state) => state.currentUser.value);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);

    const handleAdd = () => {
        setAdd(!add);
    };

    const handleEdit = (item) => {
        setEdit(!edit);
        if (item) {
            setSelected(item);
        }
    };

    const handleDelete = (item) => {
        setDel(!del);
        if (item) {
            setSelected(item);
        }
    };

    const stagiaire = useDisclosure()

    const handleStagiaire = (item)=>{
        if(item){
            setSelected(item)
            stagiaire.onOpen()
        }else{
            stagiaire.onClose()
        }
    }

    useEffect(()=>{
        if(data){
            const newDemande = data.some(item=>item.isNew)
            if(newDemande){
                setTimeout(() => {
                    demande.viewed()
                }, 3000);
            }
        }
    } , [data])

        // useEffect(() => {
        //     if (!offre_units) {
        //         setFilteredData([]);
        //         return;
        //     }
    
        //     const filtered = offre_units.filter((item) => {
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
        // }, [offers, selectedStatus, searchTerm]);
    
    
        // useEffect(()=>{
        //     if(offers){
        //         const dispo_offre = offre_units.some(item => item.nombre_stagiaire > 0) 
    
        //         if(dispo_offre){
        //             setSelectedStatus('dispo')
        //         }else{
        //             setSelectedStatus('all')
        //         }
        //     }
        // } , [offers])
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
                                <option value="all">Tous</option>
                                <option value="dispo">Disponible</option>
                                <option value="indispo">Indisponible</option>
                            </select>
                        </div>

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
                        onStagiaire={handleStagiaire}
                    />
                </div>
            </MainContainer>

                <PopUpContainer
                    isOpen={stagiaire.isOpen}
                    onOpenChange={stagiaire.onOpenChange}
                >
                    <NewStagiaire data={ selected } onStagiaire={handleStagiaire}/>
                </PopUpContainer>
        </>
    );
}

export default PC_demande;

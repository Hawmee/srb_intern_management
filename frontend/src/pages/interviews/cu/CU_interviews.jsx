import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { Search } from "lucide-react";
import { isArrayNotNull } from "../../../functions/Functions";
import InterViews from "../InterViews";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Validate from "./forms/Validate";
import Decline from "./forms/Decline";
import { observation_stagiaire } from "../../../utils/Observations";
import { useSelector } from "react-redux";

function CU_interviews({ interviews }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [validate,setValidate]= useState(false)
    const [decline,setDecline]= useState(false)
    const [selected, setSelected] = useState(null)
    const currentUser = useSelector(state=>state.currentUser.value)

    const hanldeValidate = (item)=>{
        if(item){
            setSelected(item)
        }
        setValidate(!validate)
    }

    const handleDecline = (item)=>{
        if(item){
            setSelected(item)
        }
        setDecline(!decline)
    }


    const interv_CU = isArrayNotNull(interviews)
        ? interviews.filter(
              (interv) =>
                  (interv.status && interv.date_interview) ||
                  (!interv.status && !interv.date_interview)
          )
        : [];


        useEffect(() => {
            if (!interv_CU) {
                setFilteredData([]);
                return;
            }
    
            const filtered = interv_CU.filter((item) => {
                const statusMatch =
                    selectedStatus == "all" ||
                    (selectedStatus == "demande"
                        ? !item.status
                        : item.status && item.date_interview);
    
                if (!searchTerm) return statusMatch;
    
                const searchLower = searchTerm.toLowerCase();
                const stagiaire = item.stagiaire
                const nameMatch =
                    stagiaire.nom?.toLowerCase().includes(searchLower) ||
                    stagiaire.prenom?.toLowerCase().includes(searchLower);
                const allNameMatch = (
                    stagiaire.nom +
                    " " +
                    stagiaire.prenom
                )
                    .toLowerCase()
                    .includes(searchLower);
    
                return (
                    statusMatch &&
                    (nameMatch || allNameMatch)
                );
            });
        
            setFilteredData(filtered);
        }, [interviews, selectedStatus, searchTerm]);


        useEffect(()=>{
            if(interviews){
                const demande = interv.some(item=> !item.status)
                if(demande){
                    setSelectedStatus('demande')
                }else{
                    setSelectedStatus('entretient')
                }
            }
        } , [interviews])

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between ">
                        <div className="min-w-56 flex flex-row justify-center items-end h-full">
                            <select
                                name=""
                                id=""
                                className="px-2 py-1 border-[2px] border-gray-400  rounded-[12px] cursor-pointer outline-none"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="demande">
                                    Demande d'entretient
                                </option>
                                <option value="entretient">Entretient à venir</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-1 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(stagiaire , date, ...)"
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
                <div className="">
                    <Table data={filteredData} onValidate={hanldeValidate} onDecline={handleDecline} />
                </div>
            </MainContainer>

            {validate && (
                <PopUpContainer>
                    <Validate data={selected} onValidate={hanldeValidate} />
                </PopUpContainer>
            )}

            {decline && (
                <PopUpContainer>
                    <Decline data={selected} onDecline={handleDecline} />
                </PopUpContainer>
            )}
        </>
    );
}

export default CU_interviews;

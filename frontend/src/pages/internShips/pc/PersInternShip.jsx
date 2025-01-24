import React, { useEffect, useState } from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import { Search } from "lucide-react";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Stage from "./cards/Stage";
import Stagiaire from "./cards/Stagiaire";
import Taches from "./cards/Taches";
import Performance from "./cards/Performance";
import { isArrayNotNull } from "../../../functions/Functions";
import Affirm from "./forms/Affirm";
import DefTheme from "./forms/DefTheme";
import Book from "./forms/Book";
import Mail from "./forms/Mail";
import Print from "./forms/Print";
import { useDisclosure } from "@nextui-org/react";

function PersInternShip({ data }) {
    const [selected, setSelected] = useState(null);
    const [row, setRow] = useState(null);
    const affirm = useDisclosure()

    const def_theme = useDisclosure()
    const book = useDisclosure()
    const mail = useDisclosure()
    const printnote = useDisclosure()



    const handleAffirm = (item) => {
        if (item) {
            setSelected(item);
            affirm.onOpen()
        }else{
            affirm.onClose()
        }
    };

    const handleRow = (item) => {
        if (item) {
            setRow(item);
        }
    };

    const handelDefTheme = (item) => {
        if(def_theme.isOpen){
            def_theme.onClose()
        }else{
            def_theme.onOpen()
        }
    };

    const handleBook = (item)=>{
        if(item){
            setSelected(item)
            book.onOpen()
        }else{
            book.onClose()
        }
    }

    const handleMail = (item)=>{
        if(item){
            setSelected(item)
            mail.onOpen()
        } else{
            mail.onClose()
        }
    }


    const hanldePrint = (item)=>{
        if(item){
            setSelected(item)
            printnote.onOpen()
        } else{
            printnote.onClose()
        }
    }

    useEffect(() => {
        if (row) {
            const row_id = row.id;
            const matching_data = isArrayNotNull(data)
                ? data.find((item) => Number(item.id) == Number(row_id))
                : row;
            setRow(matching_data)
        }
    }, [data, row]);

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
                                // value={navigation}
                                // onChange={(e) => setNavigation(e.target.value)}
                            >
                                <option value="Demande">
                                    Tous
                                </option>
                                <option value="Entretient">Entretient</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(stagiaire , date ,...)"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    // onChange={(e) => {
                                    //     setSearchTerm(e.target.value);
                                    // }}
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
                            data={data}
                            onAffirm={handleAffirm}
                            onBook={ handleBook }
                            onRow={handleRow}
                            onMail={handleMail}
                            onPrint={hanldePrint}
                            row={row}
                        />
                    </div>
                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2  ">
                        <div className="text-center px-12 py-4  text-lg text-gray-800">
                            <div className="border-b-[2px] pb-2">Details :</div>
                        </div>
                        <div className=" card h-full overflow-auto px-4 py-1 pb-8 ">
                            {row ? (
                                <>
                                    <div className="mb-4">
                                        <Stage
                                            stage={row}
                                            onDefTheme={handelDefTheme}
                                        />
                                    </div>

                                    {row.stagiaire && (
                                        <div className="mb-4">
                                            <Stagiaire data={row} />
                                        </div>
                                    )}
                                    {row.performance && (
                                        <div className="mb-4">
                                            <Performance data={row.performance} />
                                        </div>
                                    )}
                                    {isArrayNotNull(row.taches) && (
                                        <div className="mb-4">
                                            <Taches data={row} />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="h-full w-full flex flex-col justify-center items-center text-lg text-gray-600">
                                    ( Veuillez Choisir un element du tableau)
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MainContainer>

                <PopUpContainer
                    isOpen={affirm.isOpen}
                    onOpenChange={affirm.onOpenChange}
                >
                    <Affirm data={selected} onAffirm={handleAffirm} />
                </PopUpContainer>

                <PopUpContainer isOpen={def_theme.isOpen} onOpenChange={def_theme.onOpenChange}>
                    <DefTheme data={row} onDefTheme={handelDefTheme} />
                </PopUpContainer>

                <PopUpContainer isOpen={book.isOpen} onOpenChange={book.onOpenChange}>
                    <Book data={selected} onBook={handleBook} />
                </PopUpContainer>

                <PopUpContainer isOpen={mail.isOpen} onOpenChange={mail.onOpenChange}>
                    <Mail data={selected} handleMail={handleMail} />
                </PopUpContainer>

                <PopUpContainer isOpen={printnote.isOpen} onOpenChange={printnote.onOpenChange}>
                    <Print data={selected} onPrint={hanldePrint} />
                </PopUpContainer>
        </>
    );
}

export default PersInternShip;

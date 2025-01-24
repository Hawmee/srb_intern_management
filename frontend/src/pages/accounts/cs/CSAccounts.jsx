import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import axios from "axios";
import { toast } from "react-toastify";
import { filterObjdiff, isArrayNotNull } from "../../../functions/Functions";
import Validate from "./forms/Validate";
import { useDisclosure } from "@nextui-org/react";
import { Search } from "lucide-react";

function CSAccounts() {
    const accounts = useSelector((state) => state.account.value);
    const toastConfig = useSelector((state) => state.toastConfig.value);
    const users = isArrayNotNull(accounts)
        ? filterObjdiff(accounts, "isChefService", true)
        : [];
    const url = useSelector((state) => state.backendUrl.value);

    const [selected_user, setSelected_user] = useState(null);

    const validate = useDisclosure();

    const handleValidate = (account) => {
        if (account) {
            setSelected_user(account);
            validate.onOpen();
        } else {
            validate.onClose();
        }
    };

    const onValidate = async () => {
        try {
            const validated = await axios.patch(
                `${url}/user/${selected_user.id}`,
                selected_user
            );
            if (validated) {
                toast.success(
                    `Utilisateur ${selected_user.matricule} validé !`,
                    toastConfig
                );
                validate.onClose();
            }
        } catch (error) {
            toast.error("Erreur au niveau du serveur", toastConfig);
            console.log(error);
        }
    };

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 mb-4">
                        <div className="flex flex-row justify-center items-end h-full">
                            <select
                                className="px-2 py-2 border-[2px] border-gray-400 rounded-[12px] cursor-pointer outline-none w-32"
                                // value={selectedStatus}
                                // onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="all">Tous</option>
                                <option value="Postulant">Division</option>
                                <option value="A entretenir">Bureau</option>
                            </select>
                        </div>

                        <div className="flex flex-row flex-1 h-full justify-end items-end">
                            <div className="flex flex-row text-gray-600 py-2 rounded-2xl bg-white px-2 border-2 ">
                                <input
                                    type="text"
                                    placeholder="Rechercher un utilisateur"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    // onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="mr-1 px-1 flex flex-row items-center cursor-pointer">
                                    <Search size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SearchContainer>
                <div>
                    <Table data={users} onValidate={handleValidate} />
                </div>
            </MainContainer>

            <PopUpContainer
                isOpen={validate.isOpen}
                onOpenChange={validate.onOpenChange}
            >
                <Validate onValidate={handleValidate} submit={onValidate} />
            </PopUpContainer>
        </>
    );
}

export default CSAccounts;

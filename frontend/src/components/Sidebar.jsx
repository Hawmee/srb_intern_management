import { LogOut, User } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../features/currentUser";
import PopUpContainer from "./containers/PopUpContainer.jsx";
import { isArrayNotNull } from "../functions/Functions.js";
import { useDisclosure } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function Sidebar({ children }) {
    const current_user = useSelector((state) => state.currentUser.value);
    const accounts = useSelector((state) => state.account.value);
    const user = isArrayNotNull(accounts)
        ? current_user &&
          accounts.find((item) => Number(item.id) == Number(current_user.id))
        : current_user;
    const toastConfig = useSelector((state) => state.toastConfig.value);
    const url = useSelector((state) => state.backendUrl.value);

    const dispatch = useDispatch();
    const [confirmation, setConfirmation] = useState(false);

    const logoutModal = useDisclosure();

    const handleLogout = () => {
        setConfirmation(!confirmation);
    };

    const logout = async () => {
        try {
            const logged_out = await axios.post(`${url}/logout`, "logged_out", {
                withCredentials: true,
            });
            const message = logged_out.data.message;
            dispatch(setCurrentUser(null));
            toast.success(message, toastConfig);
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message, toastConfig);
        }
    };

    console.log(user);

    return (
        <>
            <aside className="h-full">
                <nav className="h-full flex flex-col bg-white border-r-[2px] shadow-sm">
                    <div className="text-center text-[18px] p-4">
                        <div className="border-b-[2px] text-gray-500 pb-4 font-extrabold">
                            {user && (user.unite ? user.unite.nom : "S R B")}
                        </div>
                    </div>
                    <div className="flex-1 px-3 ">{children}</div>

                    <div className="UserProfile border-t border-gray-300 flex p-3 flex-row items-center ">
                        <div className="bg-gray-600 rounded-[18px] px-1.5 pt-1 h-[35px]">
                            <User color="white" size={25} />
                        </div>
                        <div className="flex items-center justify-between w-52 ml-3">
                            <div className="leading-4 cursor-pointer">
                                <NavLink to={`profile`}>
                                    <h4 className="font-semibold text-gray-600 hover:text-gray-600 mb-1 text-[1.1rem]">
                                        {user && user.nom} {user && user.prenom}
                                    </h4>
                                    <span className="text-white bg-gray-600 rounded-[12px] px-2 text-sm ">
                                        {user &&
                                            (user.isChefService
                                                ? "Chef de Service"
                                                : user.isChefUnit
                                                ? "Chef d'Unité "
                                                : user.isPersCellule ||
                                                  user.isPersSecretariat
                                                ? "Personnel"
                                                : "Utilisateur")}
                                    </span>
                                </NavLink>
                            </div>
                            <button
                                className="text-red-400 hover:text-red-500"
                                onClick={logoutModal.onOpen}
                            >
                                <div>
                                    <LogOut size={28} />
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>
            <PopUpContainer
                isOpen={logoutModal.isOpen}
                onOpenChange={logoutModal.onOpenChange}
            >
                <div className={"text-[20px] mb-2"}>Deconnexion</div>
                <div className={"text-[18px] w-[18vw] mb-3 "}>
                    Voulez vous vous deconnecter ?
                </div>
                <div className={"flex flex-row justify-end"}>
                    <button
                        className={
                            "bg-gray-500 rounded-[8px] text-white hover:bg-gray-600 py-1 px-2 mr-2"
                        }
                        onClick={logoutModal.onClose}
                    >
                        Annuler
                    </button>
                    <button
                        className={
                            "bg-blue-500 rounded-[8px] text-white hover:bg-blue-600 py-1 px-2"
                        }
                        onClick={logout}
                    >
                        Se deconnecter
                    </button>
                </div>
            </PopUpContainer>
        </>
    );
}

// eslint-disable-next-line react/prop-types
export function SideBarLinks({ icon, text, href, alert, alertRed }) {
    return (
        <li>
            <NavLink
                className={({ isActive }) => `
                relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors
                ${
                    isActive
                        ? "bg-gray-100 text-blue-400"
                        : "hover:bg-gray-200 text-gray-700 "
                }
            `}
                to={href}
                end
            >
                {icon}
                <span className=" ml-3">{text}</span>
                {alert && (
                    <div className="absolute right-2 p-[5px] rounded-[10px] bg-blue-400 w-2 text-gray-50" />
                )}
                {alertRed && (
                    <div className="absolute right-2 p-[5px] rounded-[10px] bg-red-500 w-2 text-gray-50" />
                )}
            </NavLink>
        </li>
    );
}

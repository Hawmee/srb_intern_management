import { AlignJustify } from "lucide-react";
import React, { Children } from "react";
import Sidebar from "../components/Sidebar";
import { format, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "react-toastify";

export default function MereLayout({ children }) {
    const today = startOfToday();
    const today_date = format(today, "EEEE,dd MMMM yyyy", { locale: fr });

    return (
        <>
            <div className="grid grid-rows-[auto_1fr] h-screen">
                <div className="flex flex-row justify-between py-4 border-b-[2px] shadow-sm">
                    <div className="logo px-4 flex flex-row items-center">
                        <div>
                            <button className="p-1.5 flex flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600">
                                <AlignJustify size={20} />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <h1
                                className="text-xl font-bold tracking-wide 
                                bg-gradient-to-r from-blue-400 to-blue-500
                                bg-clip-text text-transparent 
                                hover:from-blue-500 hover:to-blue-600
                                transition-all duration-500 ease-in-out
                                cursor-pointer select-none
                                drop-shadow-sm"
                            >
                                SRB Intern Management
                            </h1>
                        </div>
                    </div>
                    <div className="dark/light px-10 flex flex-row items-center justify-between">
                        <div className="mr-5 text-lg text-gray-600">
                            {today_date}
                        </div>
                    </div>
                </div>

                <div className=" grid grid-cols-[auto_1fr] h-full flex-row ">
                    <Sidebar>{children[0]}</Sidebar>
                    <div className="main bg-white w-full h-full">
                        {children[1]}
                    </div>
                </div>
            </div>
        </>
    );
}

export const notifySuccess = (message) => {
    const conf = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };
    if (!message) {
        const mess = "Action reussite !";
        return toast.success(mess);
    }
    toast.success(message, conf);
};

export const notifyError = (message) => {
    const conf = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };
    const mess = "Erreur lors de l'operation !";
    if (!message) {
        return toast.error(mess);
    }
    toast.error(`${mess} ${message}`, conf);
};

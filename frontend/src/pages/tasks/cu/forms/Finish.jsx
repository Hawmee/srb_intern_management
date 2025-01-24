import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";

function Finish({ onFInish, data }) {
    const url = useSelector((state) => state.backendUrl.value);
    const id = data.id;
    const endpoint = `${url}/tache/validate/${id}`;

    const submit = async () => {
        try {
            const finished = await axios.patch(endpoint);
            if (finished) {
                notifySuccess();
                onFInish();
            }
        } catch (error) {
            console.log(error);
            notifyError();
        }
    };

    return (
        <>
            <div className="flex flex-col min-w-[20vw]">
                <div className="text-center px-16 ">
                    <div className="border-b-2 text-lg pb-2 border-gray-300">
                        Tache achevée
                    </div>
                </div>
                <div className="text-lg mt-3">
                    Voulez vous marquer cette tache comme achevée ?
                </div>

                <div className="flex flex-row justify-end text-white mt-4">
                    <button
                        className="bg-gray-600 hover:bg-gray-500 rounded-md px-4 py-1 mr-2"
                        onClick={() => {
                            onFInish();
                        }}
                    >
                        Annuler
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-1" 
                        onClick={()=>{
                            submit()
                        }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default Finish;

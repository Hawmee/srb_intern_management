import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Abandon({ onAbandon, data }) {
    const url = useSelector((state) => state.backendUrl.value);
    const toastconf = useSelector((state) => state.toastConfig.value);
    const id = data.id;

    const submit = async () => {
        try {
            const abandonned = await axios.patch(
                `${url}/stage/abandon/${id}`,
                data
            );
            if (abandonned) {
                onAbandon();
                const message = "Actoin reussite !";
                toast.success(message, toastconf);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <div className="text-center text-lg min-w-[15vw]">
                    Stage Abandonnée
                </div>
                <div className="text-[18px] mt-4">
                    Etes-vous sure de poursuivre cette action ?
                </div>
                <div className="flex flex-row justify-end text-white mt-6">
                    <button
                        className="bg-gray-600 hover:bg-gray-700 rounded-[8px] px-4 py-1 mr-3"
                        onClick={() => {
                            onAbandon();
                        }}
                    >
                        Annuler
                    </button>

                    <button
                        className="bg-red-600 hover:bg-red-500 rounded-[8px] px-4 py-1"
                        onClick={() => {
                            submit();
                        }}
                    >
                        Poursuivre
                    </button>
                </div>
            </div>
        </>
    );
}

export default Abandon;

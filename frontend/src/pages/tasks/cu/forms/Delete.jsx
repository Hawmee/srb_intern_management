import React from "react";
import { tache } from "../../../../services/tache";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";

function Delete({onDelete , data}) {

    const submit = async () => {
        try {
            const tache_id = Number(data.id);
            const deleted_task = await tache.delete(tache_id)
            if (deleted_task) {
                notifySuccess();
                onDelete();
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
                        Supprimer la tache
                    </div>
                </div>
                <div className="text-lg mt-3">
                    Voulez vous supprimer la tache "{data.nom}" ?
                </div>

                <div className="flex flex-row justify-end text-white mt-4">
                    <button
                        className="bg-gray-600 hover:bg-gray-500 rounded-md px-4 py-1 mr-2"
                        onClick={() => {
                            onDelete();
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-1"
                        onClick={() => {
                            submit();
                        }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default Delete;

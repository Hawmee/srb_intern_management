import React from "react";
import { entretiens } from "../../../../services/entretiens";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";

function IsInformed({ handleInform, data }) {

    const id = Number(data.id)

    const submit = async()=>{
        try {
            const isInformed = await entretiens.informed(id)
            if(isInformed){
                handleInform()
                notifySuccess()               
            }        
        } catch (error) {
            console.log(error)
            notifyError()
        }
    }

    return (
        <>
            <div clasName="flex flex-row">
                <div className="text-[20px] mb-4">Stagiaire informé</div>
                <div className="text-[19px] mb-4">
                    Voulez-vous vraiment pursuivre cette action ?
                </div>
                <div className=" flex flex-row justify-end text-white">
                    <button className="bg-gray-500 hover:bg-gray-600 py-1 px-4 rounded-[8px] mr-2" onClick={()=>{handleInform()}}>
                        Annuler
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-[8px]" onClick={()=>{submit()}}>
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default IsInformed;

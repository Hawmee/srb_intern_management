import React from "react";
import PassWord from "../forms/PassWord";

function Password() {
    return (
        <div className="flex flex-col items-start rounded-lg">
            <div className="underline underline-offset-4">
                MOTS DE PASSE:
            </div>
            <div className="mt-6">
                    <PassWord />
            </div>
        </div>
    );
}

export default Password;

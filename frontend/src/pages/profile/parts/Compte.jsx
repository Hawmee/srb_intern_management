import React from "react";
import Account from "../forms/Account";

function Compte({data}) {
    return (
        <div className="flex flex-col items-start  w-full rounded-lg">
            <div className="underline underline-offset-4">
                COMPTE :
            </div>
            <div className="mt-6 w-full">
                    <Account data={data} />
            </div>
        </div>
    );
}

export default Compte;

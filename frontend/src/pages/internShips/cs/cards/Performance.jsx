import React from "react";

function Performance({ data }) {
    return (
        <>
            <div className="flex flex-col p-4 bg-gray-100 text-gray-700 rounded-[12px] min-w-28 shadow-shadow-md pb-12 ">
                <div className="text-center text-lg border-b-[2px] border-gray-300 pb-2 ">
                    Performance
                </div>
                {data && (
                    <>
                        <div className="flex flex-col mt-6">
                            <div className="mb-3">-Comportement Professionnel: {data.pertinance_pro} /20</div>
                            <div className="mb-3">
                                -Pertinence technique: {data.pertinance_tech} /20
                            </div>
                            <div className="mb-3">-Pertinence pedagogique: {data.pertinance_pedago} /20</div>
                            <div className="mb-3">Observation : {data.observation} </div>
                        </div>
                    </>
                )}
                
            </div>
        </>
    );
}

export default Performance;

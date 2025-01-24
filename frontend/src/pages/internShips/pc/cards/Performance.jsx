import React from "react";

function Performance({ data }) {
    const performance = data;

    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden 
            border border-gray-200 transition-all duration-300 
            hover:shadow-xl hover:scale-[1.02]">
            <div className="bg-white px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-blue-400 
                    tracking-wide leading-tight">
                    Performances du Stagiaire
                </h2>
            </div>
            <div className="px-6 py-5 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Comportements Professionel
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {performance.pertinance_pro} /20
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Pertinence Technique
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {performance.pertinance_tech} /20
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Pertinence Pedagogique
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {performance.pertinance_pedago} /20
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Performance;
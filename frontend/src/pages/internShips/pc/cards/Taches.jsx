import React from "react";
import { isArrayNotNull } from "../../../../functions/Functions";
import { task_observations } from "../../../../utils/Observations";

function Taches({ data }) {
    const taches = data?.taches || [];

    // Calculate task counts
    const taskCounts = {
        total: taches.length,
        enCours: taches.filter((task) => task.observation === task_observations.en_cours).length,
        acheve: taches.filter((task) => task.observation === task_observations.acheve).length,
        retard: taches.filter((task) => task.observation === task_observations.retard).length,
        inacheve: taches.filter((task) => task.observation === task_observations.inacheve).length,
    };

    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden 
            border border-gray-200 transition-all duration-300 
            hover:shadow-xl hover:scale-[1.02]">
            <div className="bg-white px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-blue-400 
                    tracking-wide leading-tight">
                    Taches
                </h2>
            </div>
            <div className="px-6 py-5 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Total</span>
                    <span className="text-gray-800 font-semibold">
                        {taskCounts.total}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Taches En Cours</span>
                    <span className="text-gray-800 font-semibold">
                        {taskCounts.enCours}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Taches Achevées</span>
                    <span className="text-blue-500 font-semibold">
                        {taskCounts.acheve}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Taches Achevées avec retard</span>
                    <span className="text-red-500 font-semibold">
                        {taskCounts.retard}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Taches Inachevées</span>
                    <span className="text-red-500 font-semibold">
                        {taskCounts.inacheve}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Taches;
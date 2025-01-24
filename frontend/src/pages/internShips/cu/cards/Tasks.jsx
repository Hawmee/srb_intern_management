import React from "react";
import { date_d_m_y, isArrayNotNull } from "../../../../functions/Functions";
import { task_observations } from "../../../../utils/Observations";
import { ClipboardX } from "lucide-react";

function Tasks({ data }) {
    const stage = data;
    const taches = stage ? data.taches : [];
    const tasks = taches;

    const total = isArrayNotNull(taches) ? taches.length : 0;

    const unfinished =
        isArrayNotNull(tasks) &&
        tasks.filter((task) => task.observation == task_observations.inacheve);
    const unfinished_number = isArrayNotNull(unfinished)
        ? unfinished.length
        : 0;

    const en_cours =
        isArrayNotNull(tasks) &&
        tasks.filter((task) => task.observation == task_observations.en_cours);
    const en_cours_number = isArrayNotNull(en_cours) ? en_cours.length : 0;

    const _finished =
        isArrayNotNull(tasks) &&
        tasks.filter(
            (task) => task.observation == task_observations.acheve
        );
    const finished_number = isArrayNotNull(_finished) ? _finished.length : 0;

    const retard = isArrayNotNull(tasks)
        ? tasks.filter((item) => item.observation == task_observations.retard)
              ?.length
        : 0;

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
            {isArrayNotNull(taches) ? (
                <div className="px-6 py-5 space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Total
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {total}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Taches en cours
                        </span>
                        <span className="text-gray-800 font-semibold">
                            {en_cours_number}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Taches achevées
                        </span>
                        <span className="text-blue-500 font-semibold">
                            {finished_number}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Taches achevées avec retard
                        </span>
                        <span className="text-red-500 font-semibold">
                            {retard}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                            Taches inachevées
                        </span>
                        <span className="text-red-500 font-semibold">
                            {unfinished_number}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="bg-gray-50 rounded-full p-2 mb-2 shadow-md text-gray-400">
                        <ClipboardX />
                    </div>
                    <p className="text-gray-500 text-base">
                        Aucune tâche attribuée pour le moment
                    </p>
                </div>
            )}
        </div>
    );
}

export default Tasks;
import {
    BookUser,
    ClipboardList,
    GraduationCap,
    Handshake,
    NotebookText,
} from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBarLinks } from "../../components/Sidebar";
import SidebarContents from "../../components/SidebarContent";
import MereLayout from "../MereLayout";
import axios from "axios";
import { setTache } from "../../features/tache";
import {
    addDays,
    isBefore,
    isWithinInterval,
    parseISO,
    startOfDay,
} from "date-fns";
import { isArrayNotNull } from "../../functions/Functions";
import { observation_stage, task_observations } from "../../utils/Observations";

function ChefUnitLayout() {
    const user = useSelector((state) => state.currentUser.value);
    const url = useSelector((state) => state.backendUrl.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const task = useSelector((state) => state.tache.value);
    const [almostDeadlineTasks, setAlmostDeadLine] = useState(false);
    const [unfinishedTasks, setUnfinishedTasks] = useState(false);
    const unite_recent = user ? user.unite_id : null
    const stages = useSelector(state=>state.stage.value)

    const unite_stages = isArrayNotNull(stages) ? stages.filter(item=>{
        const unite_matching = (Number(item.unite_id) == Number(unite_recent))
        const isAffirmed = (item.observation == observation_stage.en_cours || item.observation == observation_stage.a_venir)
        return (unite_matching && isAffirmed)
    }) : null

    const isNewStages = isArrayNotNull(unite_stages) ? unite_stages.some(item=>item.isNew) : false

    const getAlltasks = async () => {
        try {
            const tasks_response = await axios.get(`${url}/tache`);
            const tasks = tasks_response.data;
            dispatch(setTache(tasks));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (task) {
            // Get all tasks, not just filtered ones
            const tasks = Array.isArray(task) ? task : [];

            const today = startOfDay(new Date());
            
            // Check for almost deadline tasks
            const almostDeadline = tasks.some(item => {
                if (!item.date_fin) return false;
                const finished = (item.observation !== task_observations.en_cours || item.status)
                const dateFin = parseISO(item.date_fin);
                const interval = { start: today, end: addDays(today, 3) };
                const isNearDeadline = isWithinInterval(dateFin, interval) && !item.status;
                const stage = item.stage
                const unite_matching = Number(user.unite_id) == Number(stage.unite_id)
                const isCurrent = (stage.observation == observation_stage.a_venir || stage.observation == observation_stage.en_cours)
                
                return (isNearDeadline && isCurrent && !finished && unite_matching);
            });

            // Check for unfinished tasks
            const unfinished = tasks.some(item => {
                if (!item.date_fin) return false;
                const dateFin = parseISO(item.date_fin);
                const encours = item.observation === task_observations.en_cours;
                return isBefore(dateFin, today) && encours;
            });

            console.log("Status updates:", { almostDeadline, unfinished });
            setAlmostDeadLine(almostDeadline);
            setUnfinishedTasks(unfinished);
        }
    }, [task]);

    const unfinished = async () => {
        try {
            await axios.patch(`${url}/taches/unfinished/`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (unfinishedTasks) {
            unfinished();
        }
    }, [unfinishedTasks]);

    useEffect(() => {
        if (user && !user.isChefUnit) {
            navigate("/guest/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        getAlltasks();
    }, [url]);

    return (
        <MereLayout>
            <SidebarContents>
                <SideBarLinks
                    icon={<GraduationCap size={22} />}
                    text="Stages"
                    href="/chefUnits/"
                    alert={isNewStages}
                />
                <SideBarLinks
                    icon={<ClipboardList size={22} />}
                    text="Taches"
                    href="/chefUnits/tasks"
                    alert={almostDeadlineTasks}
                />
            </SidebarContents>
            <div className="h-full">
                <Outlet />
            </div>
        </MereLayout>
    );
}

export default ChefUnitLayout;
import React, { useEffect } from "react";
import MereLayout from "../MereLayout";
import SidebarContents from "../../components/SidebarContent";
import { SideBarLinks } from "../../components/Sidebar";
import {
    BookUser,
    FileText,
    GraduationCap,
    Handshake,
    LayoutDashboard,
    NotebookText,
    Users,
    Workflow,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { editAccount, setAccounts } from "../../features/accounts";
import { setAttestation } from "../../features/attestation";
import Socket from "../../features/Socket";
import { isArray, isArrayNotNull } from "../../functions/Functions";

function ChefServiceLayout() {
    const url = useSelector((state) => state.backendUrl.value);
    const dispatch = useDispatch();
    const socket = Socket;

    const getAllAttestations = async () => {
        try {
            const attestation_response = await axios.get(`${url}/attestation`);
            const attestation = attestation_response.data;
            if (isArray(attestation)) {
                dispatch(setAttestation(attestation));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const accounts = useSelector((state) => state.account.value);
    const interviews = useSelector((state) => state.entretient.value);
    const attestations = useSelector((state) => state.attestation.value);
    const interns = useSelector((state) => state.stagiaire.value);
    const user = useSelector((state) => state.currentUser.value);
    const navigate = useNavigate();

    const isNewAccounts =
        isArray(accounts) && accounts.some((account) => account.isNew === true);

    const isNewInterviews =
        isArray(interviews) &&
        interviews.some(
            (interv) => interv.isNew && !interv.date_interview && interv.status
        );

    const isNewAttestation =
        isArray(attestations) &&
        attestations.some(
            (attestation) =>
                attestation.isNew === true && attestation.status === false
        );

    const isNewStagiaire = isArrayNotNull(interns)
        ? interns.some((item) => item.isNew)
        : false;

    useEffect(() => {
        getAllAttestations();
    }, [dispatch]);

    useEffect(() => {
        socket.on("user_validated", (user) => {
            dispatch(editAccount(user));
        });

        return () => {
            socket.off("user_validated");
        };
    }, [dispatch, socket]);

    useEffect(() => {
        if (user && !user.isChefService) {
            navigate("/guest/login");
        }
    }, [user]);

    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <div className="flex flex-col">
                        <div className="">
                            {/* <SideBarLinks
                                icon={<LayoutDashboard size={22} />}
                                text={"Dashboard"}
                                href={"/chefService/"}
                            /> */}
                            <SideBarLinks
                                icon={<BookUser size={22} />}
                                text="Stagiaires"
                                href={"interns"}
                                alert={isNewStagiaire}
                            />
                            <SideBarLinks
                                icon={<Handshake size={22} />}
                                text="Entretiens"
                                href={"/chefService/"}
                                alert={isNewInterviews}
                            />
                            {/* <SideBarLinks
                                icon={<GraduationCap size={22} />}
                                text="Stages"
                                href={"/chefService/Internships"}
                            /> */}
                            <SideBarLinks
                                icon={<FileText size={22} />}
                                text="Attestations"
                                href={"/chefService/attestations"}
                                alert={isNewAttestation}
                            />
                        </div>
                        <div className="mt-12 border-t-[2px]">
                            <SideBarLinks
                                icon={<Users size={22} />}
                                text="Comptes utilisateurs"
                                href={"/chefService/accounts"}
                                alert={isNewAccounts}
                            />
                            <SideBarLinks
                                icon={<Workflow size={22} />}
                                text="Unités de travail"
                                href="/chefService/units"
                            />
                        </div>
                    </div>
                </SidebarContents>
                <div className="h-[80vh]">
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default ChefServiceLayout;

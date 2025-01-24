import { useEffect } from "react";
import SidebarContents from "../../components/SidebarContent";
import {
    BookUser,
    FileText,
    GraduationCap,
    Handshake,
    MailOpen,
    NotebookText,
} from "lucide-react";
import MereLayout from "../MereLayout";
import { SideBarLinks } from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isArray, isArrayNotNull } from "../../functions/Functions";
import axios from "axios";
import { setAttestation } from "../../features/attestation";
import { observation_stage } from "../../utils/Observations";

function PersCelluleLayout() {
    const url = useSelector((state) => state.backendUrl.value);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUser.value);
    const attestation = useSelector((state) => state.attestation.value);
    const demands = useSelector((state) => state.demande.value);
    const internships = useSelector((state) => state.stage.value);
    const interviews = useSelector((state) => state.entretient.value);
    const navigate = useNavigate();

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

    const isNewInterviews =
        isArray(interviews) && interviews.some((interview) => interview.isNew);

    const isNewStage = isArrayNotNull(internships)
        ? internships.some((item) => {
              return (item.observation == observation_stage.non_affirme && item.isNew);
          })
        : false;

    const isNewStageFinis = isArrayNotNull(internships) ? internships.some(item =>{ 
        const isNew = item.isNew
        const observations = (item.observation == observation_stage.acheve || item.observation == observation_stage.cloture )
        return (isNew && observations)
    }) : false

    const attestations = isArrayNotNull(attestation)
        ? attestation.filter((item) => item.stage.stagiaire)
        : [];
    const isNewAttestation =
        isArray(attestations) &&
        attestations.some(
            (attestation) => attestation.isNew && attestation.status
        );

    const isNewDemande = isArrayNotNull(demands)
        ? demands.some((item) => item.isNew)
        : false;

    useEffect(() => {
        if (user && !user.isPersCellule) {
            navigate("/guest/login");
        }
    }, [user]);

    useEffect(() => {
        getAllAttestations();
    }, [dispatch]);

    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<MailOpen size={22} />}
                        text={"Demandes"}
                        href={"/persCellule/"}
                        alert={isNewDemande}
                    />
                    <SideBarLinks
                        icon={<BookUser size={22} />}
                        text={"Stagiaires"}
                        href={"/persCellule/interns"}
                    />
                    <SideBarLinks
                        icon={<Handshake size={22} />}
                        text={"Entretients"}
                        href={"interviews"}
                        alert={isNewInterviews}
                    />
                    <SideBarLinks
                        icon={<GraduationCap size={22} />}
                        text={"Stages"}
                        href={"internships"}
                        alert={isNewStage || isNewStageFinis}
                    />
                    <SideBarLinks
                        icon={<FileText size={22} />}
                        text={"Attestations"}
                        href={"/persCellule/attestation"}
                        alert={isNewAttestation}
                    />
                </SidebarContents>
                <div className="h-full">
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default PersCelluleLayout;

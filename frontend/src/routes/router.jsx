import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Authenticated from "../layouts/AuthenticatedLayout";
import Guest from '../layouts/GuestLayout'
import ChefServiceLayout from "../layouts/users/ChefServiceLayout";
import InterViews from "../pages/interviews/InterViews";
import Interns from "../pages/interns/Interns"
import InternShips from "../pages/internShips/InternShips"
import Accounts from "../pages/accounts/Accounts"
import Units from "../pages/units/Units"
import Tasks from "../pages/tasks/Tasks"
import PersSecLayout from "../layouts/users/PersSecLayout";
import WaitingPage from "../pages/redirections/WaitingPage"
import Attestation from "../pages/Attestations/Attestation"
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ChefUnitLayout from "../layouts/users/ChefUnitLayout";
import PersCelluleLayout from "../layouts/users/PersCelluleLayout";
import Profile from "../pages/profile/Profile";
import Demande from "../pages/Demandes/Demande";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Authenticated />,
        children: [
            {
                path: "chefService",
                element: <ProtectedRoute element={<ChefServiceLayout />} />,
                children: [
                    {
                        path: "",
                        element: <InterViews />,
                    },
                    {
                        path: "interns",
                        element: <Interns />,
                    },
                    {
                        path: "internships",
                        element: <InternShips />,
                    },
                    {
                        path: "interns",
                        element: <Interns />,
                    },
                    {
                        path: "attestations",
                        element: <Attestation />,
                    },
                    {
                        path: "accounts",
                        element: <Accounts />,
                    },
                    {
                        path: "units",
                        element: <Units />,
                    },
                    {
                        path: 'profile',
                        element:<Profile />
                    },
                ],
            },
            {
                path: "chefUnits",
                element: <ProtectedRoute element={<ChefUnitLayout />} />,
                children: [
                    // {
                    //     path: "",
                    //     element: <Dashboard />,
                    // },
                    {
                        path: "",
                        element: <InternShips />,
                    },
                    {
                        path: "tasks",
                        element: <Tasks />,
                    },
                    {
                        path: 'profile',
                        element:<Profile />
                    },
                ],
            },
            {
                path: "persCellule",
                element: <ProtectedRoute element={<PersCelluleLayout />} />,
                children: [
                    {
                        path: "",
                        element: <Demande />,
                    },
                    {
                        path: "interns",
                        element: <Interns />,
                    },
                    {
                        path: "internships",
                        element: <InternShips />,
                    },
                    {
                        path: "interviews",
                        element: <InterViews />,
                    },
                    {
                        path: "attestation",
                        element: <Attestation />,
                    },
                    {
                        path: 'profile',
                        element:<Profile />
                    },
                ],
            },
            {
                path: "persSecretariat",
                element: <ProtectedRoute element={<PersSecLayout />} />,
                children: [
                    {
                        path: "",
                        element: <Demande />,
                    },
                    {
                        path: 'profile',
                        element:<Profile />
                    },
                ],
            },
            {
                path: "/waiting",
                element: <WaitingPage />,
            },
        ],
    },

    {
        path: "/guest",
        element: <Guest />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

export default router;

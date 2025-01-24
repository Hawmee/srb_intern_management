import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setBackendUrl } from "./features/urlBackend";
import { setToastConfig } from "./features/toastConfig";
import axios from "axios";
import { setCurrentUser } from "./features/currentUser";
import { deleteUnit, newUnit, setUnit } from "./features/unit";
import { newAccount, setAccounts } from "./features/accounts";
import Socket from "./features/Socket";
import { isArray } from "./functions/Functions";
import { account } from "./services/account";
// import '@fontsource/figtree'

function App({ children }) {
    const backUrl = import.meta.env.VITE_BACKEND_URL;
    const socket = Socket;
    const dispatch = useDispatch();
    const users = useSelector(state=>state.account.value)


    const getAllAccounts = async ()=>{
        try {
            const accounts = await account.get()
            if(accounts){
                dispatch(setAccounts(accounts))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cookieHandling = async () => {
        const cookie = await axios.get(`${backUrl}/cookie`, {
            withCredentials: true,
        });
        const current_user = cookie.data;
        dispatch(setCurrentUser(current_user));
    };

    const getAllUnits = async () => {
        try {
            const units_data = await axios.get(`${backUrl}/unit`);
            const unit = units_data.data.data;
            if (isArray(unit)) {
                dispatch(setUnit(unit));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const toastConfig = {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        };

        getAllAccounts()
        getAllUnits();
        cookieHandling();
        dispatch(setBackendUrl(backUrl));
        dispatch(setToastConfig(toastConfig));
    }, [dispatch, backUrl]);

    useEffect(() => {
        socket.on("new_unit", (new_unit) => {
            
            dispatch(newUnit(new_unit));
        });

        socket.on("new_user", (new_user) => {
            dispatch(newAccount(new_user));
            // console.log(new_user);
        });

        

        socket.on("delete_unit", (id) => {
            dispatch(deleteUnit(Number(id)));
            // console.log(new_user);
        });

        return () => {
            socket.off("new_unit");
            socket.off("new_user");
            socket.off("delete_unit")
        };
    }, [dispatch, socket]);

    return (
        <>
            <div>
                {children}
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Slide}
                />
            </div>
        </>
    );
}

export default App;

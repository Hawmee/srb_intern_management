import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from './App.jsx'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./assets/fonts/fonts.css";
import currentUserReducer from "./features/currentUser.js";
import tokenReducer from "./features/token.js";
import backendUrlReducer from "./features/urlBackend.js";
import toastConfigReducer from "./features/toastConfig.js";
import accounReducer from "./features/accounts.js";
import attestationReducer from "./features/attestation.js";
import entretientReducer from "./features/entretient.js";
import perfReducer from "./features/perf.js";
import stageReducer from "./features/stage.js";
import stagiaireReducer from "./features/stagiaire.js";
import tacheReducer from "./features/tache.js";
import unitReducer from "./features/unit.js";
import selectedReducer from "./features/selected.js";
import demandeReducer from "./features/demande.js";
import "./global.css";
import router from "./routes/router.jsx";
import "./components/styles/Table.css";
import { NextUIProvider } from "@nextui-org/react";
// import '@fontsource/figtree'

const store = configureStore({
    reducer: {
        selected: selectedReducer,
        token: tokenReducer,
        currentUser: currentUserReducer,
        backendUrl: backendUrlReducer,
        toastConfig: toastConfigReducer,
        account: accounReducer,
        attestation: attestationReducer,
        demande: demandeReducer,
        entretient: entretientReducer,
        perf: perfReducer,
        stage: stageReducer,
        stagiaire: stagiaireReducer,
        tache: tacheReducer,
        unit: unitReducer,
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <NextUIProvider>
            <Provider store={store}>
                <App>
                    <RouterProvider router={router} />
                </App>
            </Provider>
        </NextUIProvider>
    </StrictMode>
);

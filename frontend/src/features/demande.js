import { createSlice } from "@reduxjs/toolkit";
import { demande } from "../services/demande";

const demandeSlice = createSlice({
    name: "demande",
    initialState: { value: [] },

    reducers: {
        setDemande: (state, action) => {
            state.value = action.payload;
        },

        newDemande: (state, action) => {
            state.value.push(action.payload);
        },

        editDemande: (state, action) => {
            if (Array.isArray(action.payload)) {
                action.payload.forEach(entretient => {
                    const index = state.value.findIndex((data) => data.id === entretient.id);
                    if (index !== -1) {
                        state.value[index] = { ...state.value[index], ...entretient };
                    }
                });
            } else {
                const { id, ...updatedData } = action.payload;
                const index = state.value.findIndex((data) => data.id === id);
                if (index !== -1) {
                    state.value[index] = { ...state.value[index], ...updatedData };
                }
            }
        },

        deleteDemande: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((data) => data.id !== id);
        },
    },
});



export const  {setDemande , newDemande , editDemande , deleteDemande} = demandeSlice.actions;
export default demandeSlice.reducer;

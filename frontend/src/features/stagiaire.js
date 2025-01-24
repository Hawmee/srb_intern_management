import { createSlice } from "@reduxjs/toolkit";
import { filterObjdiff } from "../functions/Functions";

const stagiaireSlice = createSlice({
    name: "stagiaire",
    initialState: { value: [] },

    reducers: {
        setStagiaire: (state, action) => {
            state.value = action.payload;
        },

        newStagiaire: (state, action) => {
            state.value.push(action.payload);
        },

        editStagiaire: (state, action) => {
            const { id, ...updatedData } = action.payload;
            const index = state.value.findIndex((data) => data.id == id);

            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...updatedData };
            }
        },

        deleteStagiaire: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((data) => data.id !== id);
        },
    },
});

export const { setStagiaire, newStagiaire, editStagiaire, deleteStagiaire } =
    stagiaireSlice.actions;

export default stagiaireSlice.reducer;

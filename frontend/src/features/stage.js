import { createSlice } from "@reduxjs/toolkit";

const stageSlice = createSlice({
    name: "stage",
    initialState: { value: [] },

    reducers: {
        setStage: (state, action) => {
            state.value = action.payload;
        },

        newStage: (state, action) => {
            state.value.push(action.payload);
        },

        editStage: (state, action) => {
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

        deleteStage: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((data) => data.id !== id);
        },
    },
});

export const { setStage, newStage, editStage, deleteStage } =
    stageSlice.actions;

export default stageSlice.reducer;

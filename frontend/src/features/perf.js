import { createSlice } from "@reduxjs/toolkit";

const perfSlice = createSlice({
    name: "perf",
    initialState: { value: [] },

    reducers: {
        setPerf: (state, action) => {
            state.value = action.payload;
        },

        newPerf: (state, action) => {
            state.value.push(action.payload);
        },

        editPerf: (state, action) => {
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

        deletePerf: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((data) => data.id !== id);
        },
    },
});

export const { setPerf, newPerf, editPerf, deletePerf } = perfSlice.actions;

export default perfSlice.reducer;

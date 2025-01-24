import { createSlice } from "@reduxjs/toolkit";

const tacheSlice = createSlice({
    name: "tache",
    initialState: { value: [] },

    reducers: {
        setTache: (state, action) => {
            state.value = action.payload;
        },

        newTache: (state, action) => {
            state.value.push(action.payload);
        },

        editTache: (state, action) => {
            if (Array.isArray(action.payload)) {
                action.payload.forEach((entretient) => {
                    const index = state.value.findIndex(
                        (data) => data.id === entretient.id
                    );
                    if (index !== -1) {
                        state.value[index] = {
                            ...state.value[index],
                            ...entretient,
                        };
                    }
                });
            } else {
                const { id, ...updatedData } = action.payload;
                const index = state.value.findIndex((data) => data.id === id);
                if (index !== -1) {
                    state.value[index] = {
                        ...state.value[index],
                        ...updatedData,
                    };
                }
            }
        },

        deleteTache: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.value = state.value.filter(
                    (task) => !action.payload.includes(task.id)
                );
            } else {
                state.value = state.value.filter(
                    (task) => task.id !== action.payload
                );
            }
        },
    },
});

export const { setTache, newTache, editTache, deleteTache } =
    tacheSlice.actions;

export default tacheSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const entretientSlice = createSlice({
    name: "entretient",
    initialState: { value: [] },

    reducers: {
        setEntretient: (state, action) => {
            state.value = action.payload;
        },

        newEntretient: (state, action) => {
            state.value.push(action.payload);
        },

        editEntretient: (state, action) => {
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

        deleteEntretient: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((data) => data.id !== id);
        },
    },
});



export const  {setEntretient , newEntretient , editEntretient , deleteEntretient} = entretientSlice.actions;
export default entretientSlice.reducer;

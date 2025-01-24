import { createSlice } from "@reduxjs/toolkit";

const attestationSlice = createSlice({
    name: "attestation",
    initialState: { value: [] },

    reducers: {
        setAttestation: (state, action) => {
            state.value = action.payload;
        },

        newAttestation: (state, action) => {
            state.value.push(action.payload);
        },

        editAttestation: (state, action) => {
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

        deleteAttestation: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter(
                (attestation) => attestation.id !== id
            );
        },
    },
});


export const {setAttestation , newAttestation , editAttestation , deleteAttestation} = attestationSlice.actions
export default attestationSlice.reducer;

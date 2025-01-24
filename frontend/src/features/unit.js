import { createSlice } from "@reduxjs/toolkit";



const unitSlice = createSlice({
    name:"unit",
    initialState:{value: []},

    reducers:{
        setUnit : (state , action)=>{
            state.value = action.payload;
        },

        newUnit :(state , action)=>{
            state.value.push(action.payload)
        },

        editUnit : (state , action)=>{
            const {id, ...updatedData} = action.payload
            const index = state.value.findIndex(data=>data.id ==id)

            if(index == -1){
                state.value[index] = {...state.value[index] , ...updatedData};
            }
        },

        deleteUnit: (state , action)=>{
            const id = action.payload
            state.value = state.value.filter(data => data.id !== id)
        }
    }
})


export const {setUnit , newUnit , editUnit , deleteUnit} = unitSlice.actions

export default unitSlice.reducer
import { createSlice } from "@reduxjs/toolkit";



const selectedSlice = createSlice({
    name:"selected",
    initialState:{value: null},
    reducers:{
        set_selected : (state,action)=>{
            state.value = action.payload
        }
    }
})


export const {set_selected} = selectedSlice.actions
export default selectedSlice.reducer
import { createSlice } from "@reduxjs/toolkit";


const toastConfigSlice = createSlice({
    name: "toastConfig",
    initialState: {value: {}},
    reducers:{
        setToastConfig:(state , action)=>{
            state.value = action.payload
        }
    }
})


export const {setToastConfig} = toastConfigSlice.actions
export default toastConfigSlice.reducer
import { createSlice } from "@reduxjs/toolkit";


const backendUrlSlice = createSlice({
    name:"backendUrl",
    initialState:{value:''},
    reducers:{
        setBackendUrl: (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {setBackendUrl} = backendUrlSlice.actions 
export default backendUrlSlice.reducer

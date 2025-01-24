import { createSlice } from "@reduxjs/toolkit";
import { filterObjdiff } from "../functions/Functions";


const accountSlice = createSlice({
    name: "accounts",
    initialState: {value: []},

    reducers:{
        setAccounts: (state , action) =>{
            state.value = action.payload
        } ,

        newAccount : (state , action) =>{
            state.value.push(action.payload)
        } ,

        editAccount : (state , action) => {
            const {id, ...updatedData} = action.payload;
            const index = state.value.findIndex(account=>account.id == id);
            if(index !== -1){
                state.value[index] = {...state.value[index] , ...updatedData}
            }
        },

        deleteAccount: (state , action)=>{
            const id= action.payload;
            // state.value = state.value.filter(account => account.id !== id),
            state.value = filterObjdiff(state.value , 'id' , id )

        }
    }
})


export const {setAccounts , newAccount , editAccount , deleteAccount} = accountSlice.actions;

export default accountSlice.reducer ;
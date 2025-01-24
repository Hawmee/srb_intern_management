    import {createSlice} from '@reduxjs/toolkit'


export const tokenSlice = createSlice({
    name: "token",
    initialState: {value: localStorage.getItem('ACCESS_TOKEN')},

    reducers:{
        setToken:(state , action) => {
            const token = action.payload
            state.value = token
            if(token){
                localStorage.setItem('ACCESS_TOKEN' , token)
            }else{
                localStorage.removeItem('ACCESS_TOKEN')
            }
        }
    }
})

export const {setToken} = tokenSlice.actions
export default tokenSlice.reducer
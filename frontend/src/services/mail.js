import axios from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;



export const inform = {
    finalisation: async(data)=>{
        console.log(data)
        try {
            const mailed = await axios.post(`${baseUrl}/informFinalisation` , data)
            return mailed.data
        } catch (error) {
            console.log(error)
            throw(error)
        }
    },
}
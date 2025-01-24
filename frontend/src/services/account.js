import axios, { all } from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${baseUrl}/user`;

export const account = {

    get: async()=>{
        try {
            const accounts = await axios.get(`${url}s`)
            return accounts.data
        } catch (error) {
            console.log(error)
            throw(error)
        }
    },

    update: async (id, data) => {
        try {
            const user_id = Number(id);
            const updated = await axios.patch(
                `${url}/update/${user_id}`,
                data,
                {
                    withCredentials: true,
                }
            );
            return updated.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    new_password: async(id, data)=>{
        try {
            const user_id = Number(id)
            const updated = await axios.patch(`${url}/new_password/${user_id}` , data)
            return updated.data
        } catch (error) {
            console.log(error)
            throw(error)
        }
    }
};

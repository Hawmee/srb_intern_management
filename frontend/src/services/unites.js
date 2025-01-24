import axios, { all } from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${baseUrl}/unit`


export const unites = {
    get: async () => {
        try {
        } catch (error) {
        }
    },

    new: async (data) => {
        try {
            const unite = await axios.post(url , data)
            return unite
        } catch (error) {
            console.log(error)
            throw(error)
        }
    },

    update: async (id , data) => {
        try {
            const unite = await axios.patch(`${url}/${Number(id)}` , data)
            return unite
        } catch (error) {
            console.log(error)
            throw(error)
        }
    },

    delete: async (id) => {
        try {
            const unite = await axios.delete(`${url}/${Number(id)}`)
            return unite
        } catch (error) {
            console.log(error)
            throw(error)
        }
    },
};

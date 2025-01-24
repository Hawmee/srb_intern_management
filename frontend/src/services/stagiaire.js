import axios, { all } from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${baseUrl}/stagiaire`


export const stagiaire = {
    get: async () => {
        try {
        } catch (error) {
        }
    },

    new: async (data) => {
        try {
            const stagiaire = await axios.post(url , data)
            return stagiaire
        } catch (error) {
            console.log(error)
            throw(error)
        }
    },

    update: async () => {
        try {
        } catch (error) {}
    },

    delete: async () => {
        try {
        } catch (error) {}
    },
};

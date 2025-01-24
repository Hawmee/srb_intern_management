import axios, { all } from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${baseUrl}/demande`;

export const demande = {
    get: async () => {
        try {
            const url = `${baseUrl}/demande`;
            const demande = await axios.get(url);
            if (demande) {
                return demande.data;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    new: async (data) => {
        try {
            const demande = await axios.post(url, data);
            return demande;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const demande = await axios.patch(`${url}/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return demande;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    viewed: async (data) => {
        try {
            const viewed = await axios.patch(`${url}/viewed`);
            return viewed;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    registered: async (id) => {
        try {
            const registered = await axios.patch(`${url}/registered/${id}`);
            return registered;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const demande = await axios.delete(`${url}/${id}`);
            return demande;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

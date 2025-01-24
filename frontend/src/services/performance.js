import axios, { all } from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;


export const performance = {
    get: async () => {
        try {
        } catch (error) {
            console.log(error);
        }
    },

    new: async () => {
        try {
        } catch (error) {
            console.log(Error);
        }
    },

    update: async () => {
        try {
        } catch (error) {
            console.log(Error);
        }
    },

    delete: async () => {
        try {
        } catch (error) {
            console.log(Error);
        }
    },
};
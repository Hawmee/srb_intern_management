import axios, { all } from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;

const url = `${baseUrl}/entretient`

export const entretiens = {
    get: async () => {
        try {
        } catch (error) {
            console.log(error);
        }
    },

    new: async (data) => {
        try {
            const entretien = await axios.post(url , data)
            return entretien
        } catch (error) {
            console.log(Error);
            throw(error)
        }
    },

    update: async (id , data) => {
        try {
            const submited = await axios.patch(`${url}/${id}`,data)
            return submited
        } catch (error) {
            console.log(Error);
            throw(error)
        }
    },

    informed: async (id, data) =>{
        try {
            const submited = await axios.patch(`${url}/informed/${id}`)
            return submited
        } catch (error) {
            console.log(Error);
            throw(error)
        }
    },


    validate: async(id , data) =>{
        try {   
            const validated = await axios.patch(`${url}/validate/${id}`, data)
            return validated
        } catch (error) {
            console.log(Error);
            throw(error)
        }
    },


    cancel: async(id , data) =>{
        try {
            const canceled = await axios.patch(`${url}/cancel/${id}`)
            return canceled
        } catch (error) {
            console.log(Error);
            throw(error)
        }
    },


    delete: async () => {
        try {
        } catch (error) {
            console.log(Error);
        }
    },
};

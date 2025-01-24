import axios, { all } from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;
const url = `${baseUrl}/tache`

export const tache = {
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

    delete: async (id) => {
        try {
            const tache_id = Number(id)
            const deleted_task = await axios.delete(`${url}/${tache_id}`)
            return deleted_task.data
        } catch (error) {
            console.log(error);
        }
    },


    undone: async(id)=>{
        try {
            const tache_id = Number(id)
            const undone_task = await axios.patch(`${url}/undone/${tache_id}`)
            return undone_task.data
        } catch (error) {
            console.log(error)
            throw(error)
        }
    }

};

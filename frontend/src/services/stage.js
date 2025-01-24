import axios, { all } from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;
const url = `${baseUrl}/stage`;

export const Stage = {
    get: async () => {
        try {
        } catch (error) {
            console.log(error);
        }
    },

    new: async () => {
        try {
        } catch (error) {
            console.log(error);
        }
    },

    affirm: async (id) => {
        try {
            const id_stage = Number(id);
            const affirmed = await axios.patch(`${url}/affirm/${id_stage}`);
            return affirmed;
        } catch (error) {
            console.log(error);
            throw error;
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

    viewed: async (data) => {
        try {
            const viewed = await axios.patch(`${url}/viewed`, data);
            return viewed.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    en_cours: async (data) => {
        try {
            const en_cours_stage = await axios.patch(`${url}/en_cours`, data);
            return en_cours_stage.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    them_def: async (id, data) => {
        try {
            const id_stage = Number(id);
            const definitive_them = await axios.patch(
                `${url}/theme_defintif/${id_stage}`,
                data
            );
            return definitive_them.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    fin: async (id, data) => {
        try {
            const id_stage = Number(id);
            const finished_stage = await axios.patch(
                `${url}/fin/${id_stage}`,
                data
            );
            return finished_stage.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    booking: async (id, data) => {
        try {
            const id_stage = Number(id);
            const booked_stage = await axios.patch(
                `${url}/book/${id_stage}`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            return booked_stage.data
        } catch (error) {
            console.log(error)
            throw(error)
        }
    },


    printed: async (id) =>{
        try {
            const stage_id = Number(id)
            const printed = await axios.patch(`${url}/printed/${stage_id}`)
            return printed.data
        } catch (error) {
            console.log(error)
            throw(error)
        }
    }
};

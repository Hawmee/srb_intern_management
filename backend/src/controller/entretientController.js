import { stage_observations, stagiaire_status } from "../utils/Observations.js";
import prismaClient from "./prismaClient.js";
import { message } from "../utils/message.js";
import { isAfter, isEqual , format } from "date-fns";

const prisma = prismaClient;

export const getAllEntretient = async (req, res) => {
    try {
        const entretients = await prisma.entretients.findMany({
            include: {
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });

        res.status(200).send(entretients);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const createEntretien = async (req, res) =>{
    try {
        const data = req.body
        const entretien = await prisma.entretients.create({
            data:{
                ...data
            },
            include: {
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        })

        if(!entretien){
            return res.status(400).send({message: message.erreur})
        }

        const stagiaire = await prisma.stagiaires.update({
            where:{id: Number(entretien.stagiaire_id)},
            data:{observation: stagiaire_status.a_entretenir , isNew:false},
            include: {
                entretiens: true,
                stages: true,
            }
        })

        req.io.emit("update_stagiaire", stagiaire)
        req.io.emit("new_entretient" , entretien)
        res.status(200).send({message: message.reussite})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const markViewed = async (req, res) => {
    try {
        const viewed = await prisma.entretients.updateMany({
            where: {
                isNew: true,
            },
            data: {
                isNew: false,
            },
        });

        if (viewed.count) {
            const viewed_items = await prisma.entretients.findMany({
                where: { isNew: false },
            });
            req.io.emit("updated_entretient", viewed_items);
        }
        res.status(200).send({
            message: "Records updated successfully",
            count: viewed.count,
        });
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

export const partialUpdateEntretient = async (req, res) => {
    const { id } = req.params;
    const updated_entretient_data = req.body;
    try {
        const entretient = await prisma.entretients.update({
            where: { id: Number(id) },
            data: {
                ...updated_entretient_data,
                isInforme: false,
                isNew: true,
            },
            include: {
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });
        req.io.emit("updated_entretient", entretient);
        res.status(200).send(entretient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


export const validateEntretient = async (req, res) => {
    const { id } = req.params;
    try {
        const entretient = await prisma.entretients.update({
            where: { id: Number(id) },
            data: {
                status: true,
            },
            include: {
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });

        if(entretient){
            const stage_data = req.body
            const stage = await prisma.stages.create({
                data:{
                    observation: stage_observations.non_affirme ,
                    ...stage_data,
                } , 
                include: {
                    stagiaire: true,
                    unite: {
                        include: {
                            users: true,
                        },
                    },
                    attestation: true,
                    performance: true,
                    taches: {include:{
                        stage:true
                    }},
                },
            })

            const stagiaire = await prisma.stagiaires.update({
                where:{id: Number(entretient.stagiaire_id)},
                data:{
                    observation: stagiaire_status.en_stage,
                },
                include: {
                    entretiens: true,
                    stages: true,
                },
            })

        
            req.io.emit('new_stage' , stage)
            req.io.emit('update_stagiaire' , stagiaire)
            
        }
        req.io.emit("updated_entretient", entretient);
        res.status(200).send(entretient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const cancelEntretient = async (req, res) => {
    const { id } = req.params;
    try {
        const entretient = await prisma.entretients.update({
            where: { id: Number(id) },
            data: {
                status: true,
            },
            include: {
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });

        if (entretient) {
            const stagiaire = await prisma.stagiaires.update({
                where:{id: Number(entretient.stagiaire_id)},
                data:{
                    observation: stagiaire_status.refuse,
                },
                include: {
                    entretiens: true,
                    stages: true,
                },
            })

            if (stagiaire) {
                req.io.emit("update_stagiaire", stagiaire);
            }

            req.io.emit("updated_entretient", entretient);
            res.status(200).send({ message: "Action reussite" });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};  

export const informedEntretien = async (req, res) => {
    const { id } = req.params;
    try {
        const informed = await prisma.entretients.update({
            where: { id: Number(id) },
            data: { isInforme: true, isNew: false },
            include: {
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });

        if (informed) {
            req.io.emit("updated_entretient", informed);
            res.status(200).send({ message: "Stagiaire Informé" });
        }
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

export const deleteEntretient = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.entretients.delete({
            where: { id: Number(id) },
        });
        res.status(200).send({ message: "Element supprimé avec succes" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

import { transporter } from "../config/mailConfig.js";
import { stage_observations, stagiaire_status } from "../utils/Observations.js";
import { verifyMail } from "./mailController.js";
import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllAttestation = async (req, res) => {
    try {
        const attestation = await prisma.attestation.findMany({
            include: {
                stage: {
                    include: {
                        stagiaire: true,
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        attestation: true,
                        performance: true,
                        taches: true,
                    },
                },
            },
        });
        res.status(200).send(attestation);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newAttestation = async (req, res) => {
    const attestation_data = req.body;
    try {
        const attestation = await prisma.attestation.create({
            data: {
                isNew: true,
                status: false,
                isInforme: false,
                ...attestation_data,
            },
            include: {
                stage: {
                    include: {
                        stagiaire: true,
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        attestation: true,
                        performance: true,
                        taches: true,
                    },
                },
            },
        });

        if (attestation) {

            if (attestation.stage) {
                req.io.emit("updated_stage", attestation.stage);
            }
            req.io.emit("new_attestation", attestation);
        }
        res.status(200).send({ data: attestation });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateAttestation = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const attestation = await prisma.attestation.update({
            where: { id: Number(id) },
            data: {
                status: false,
                isNew: true,
                isInforme: false,
                isCollected: false,
                ...data,
            },
            include: {
                stage: {
                    include: {
                        stagiaire: true,
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        attestation: true,
                        performance: true,
                        taches: true,
                    },
                },
            },
        });

        if (attestation) {
            if (attestation.stage) {
                req.io.emit("updated_stage", attestation.stage);
            }
            req.io.emit("updated_attestation", attestation);
            res.status(200).send({ data: attestation });
        }
    } catch (error) {
        res.status(400).send({ message: error });
    }
};

export const validate = async (req, res) => {
    const { id } = req.params;
    try {
        const attestation = await prisma.attestation.update({
            where: { id: Number(id) },
            data: {
                status: true,
                isNew: true,
                isInforme: false,
            },
            include: {
                stage: {
                    include: {
                        stagiaire: true,
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        attestation: true,
                        performance: true,
                        taches: true,
                    },
                },
            },
        });

        if (attestation) {
            const stagiaire = await prisma.stagiaires.update({
                where: { id: Number(attestation.stage.stagiaire_id) },
                data: { observation: stagiaire_status.cloture },
                include: {
                    entretiens: true,
                    stages: true,
                },
            });
            req.io.emit("update_stagiaire", stagiaire);

            const stage = await prisma.stages.update({
                where: { id: Number(attestation.stage_id) },
                data: {
                    observation: stage_observations.cloture,
                    status:true,
                },
                include: {
                    stagiaire: true,
                    unite: {
                        include: {
                            users: true,
                        },
                    },
                    attestation: true,
                    performance: true,
                    taches: {
                        include: {
                            stage: true,
                        },
                    },
                },
            });
            if (stage) {
                req.io.emit("updated_stage", stage);
            }
            req.io.emit("updated_attestation", attestation);
            res.status(200).send({ data: attestation });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const inform = async (req, res) => {
    const datas = req.body;
    const { id } = req.params;
    try {

        const isMailValid = await verifyMail(datas.receiver_mail)

        if(!isMailValid){
            return res.status(401).send({message:"Veulliez verifier l'adresse email !!"})
        }

        const mail_option = {
            to: datas.receiver_mail,
            subject: "Attestation de Stage,",
            text: datas.content,
        };
        const sent = await transporter.sendMail(mail_option);
        if (sent) {
            const attestation = await prisma.attestation.update({
                where: { id: Number(id) },
                data: {
                    isInforme: true,
                    isNew: false,
                },
                include: {
                    stage: {
                        include: {
                            stagiaire: true,
                            unite: {
                                include: {
                                    users: true,
                                },
                            },
                            attestation: true,
                            performance: true,
                            taches: true,
                        },
                    },
                },
            });

            if (attestation) {
                if (attestation.stage) {
                    req.io.emit("updated_stage", attestation.stage);
                }
                req.io.emit("updated_attestation", attestation);
                res.status(200).send({ message: "Action reussite !" });
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const collected = async (req, res) => {
    const { id } = req.params;
    try {
        const attestation = await prisma.attestation.update({
            where: { id: Number(id) },
            data: {
                isNew: false,
                isInforme: false,
                isCollected: true,
            },
            include: {
                stage: {
                    include: {
                        stagiaire: true,
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        attestation: true,
                        performance: true,
                        taches: true,
                    },
                },
            },
        });

        if (attestation) {
            if (attestation.stage) {
                req.io.emit("updated_stage", attestation.stage);
            }
            req.io.emit("updated_attestation", attestation);
            res.status(200).send({ data: attestation });
        }
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

export const deleteAttestation = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.attestation.delete({
            where: { id: Number(id) },
        });
        res.status(200).send({ message: "Element supprimé avec succes" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

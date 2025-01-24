import { format, isAfter, isBefore, isEqual } from "date-fns";
import fs from "fs";
import { drive, FOLDER_ID } from "../config/GDrive.js";
import { stage_observations, stagiaire_status } from "../utils/Observations.js";
import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllStages = async (req, res) => {
    try {
        const stages = await prisma.stages.findMany({
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

        res.status(200).send(stages);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const affirmStage = async (req, res) => {
    try {
        const { id } = req.params;

        const stage_find = await prisma.stages.findUnique({
            where: { id: Number(id) },
        });

        if (stage_find) {
            const today = format(new Date(), "yyyy-MM-dd");
            const stageDate = format(stage_find.date_debut, "yyyy-MM-dd");
            const isBeforOrEqual = (stageDate, today) => {
                return isEqual(stageDate, today) || isBefore(stageDate, today);
            };

            let observation;

            if (isAfter(stageDate, today)) {
                observation = stage_observations.a_venir;
            } else if (isBeforOrEqual(stageDate, today)) {
                observation = stage_observations.en_cours;
            }

            const stage = await prisma.stages.update({
                where: { id: Number(id) },
                data: {
                    observation: observation,
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

            req.io.emit("updated_stage", stage);
            res.status(200).send("Action reussite");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const markviewed_affirmed = async (req, res) => {
    try {
        const { ids } = req.body;
        const viewed = await prisma.stages.updateMany({
            where: {
                observation: {
                    notIn: [
                        stage_observations.non_affirme,
                        stage_observations.acheve,
                        stage_observations.cloture,
                    ],
                },
                isNew: true,
                id: { in: ids },
            },
            data: {
                isNew: false,
            },
        });

        if (viewed.count) {
            const viewed_stages = await prisma.stages.findMany({
                where: { isNew: false },
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
            req.io.emit("updated_stage", viewed_stages);
        }
        res.status(200).send("Action reussite");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const printed = async (req,res)=>{
    try {
        const {id} = req.params
        const printed = await prisma.stages.update({
            where:{id: Number(id)},
            data:{
                isNew:false,
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
        })
    
        req.io.emit("updated_stage", printed);
        res.status(200).send("Action reussite")
    } catch (error) {
        res.status(500).send({message: error.message})
    }

}

export const stage_en_cours = async (req, res) => {
    try {
        const { ids } = req.body;
        const en_cours = await prisma.stages.updateMany({
            where: {
                id: { in: ids },
                observation: stage_observations.a_venir,
            },
            data: {
                observation: stage_observations.en_cours,
            },
        });

        if (en_cours.count) {
            const en_cours_stages = await prisma.stages.findMany({
                where: { observation: stage_observations.en_cours },
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

            req.io.emit("updated_stage", en_cours_stages);
        }

        res.status(200).send("Action reussite");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const theme_definitif = async (req, res) => {
    try {
        const { id } = req.params;
        const data_stage = req.body;
        const stage = await prisma.stages.update({
            where: { id: Number(id) },
            data: {
                ...data_stage,
                isNew: true,
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
            const taches_to_delete = await prisma.taches.findMany({
                where: { stage_id: stage.id },
                select: {
                    id: true,
                },
            });

            if (taches_to_delete.length > 0) {
                const taches = await prisma.taches.deleteMany({
                    where: { stage_id: stage.id },
                });

                if (taches.count) {
                    const delete_tache_id = taches_to_delete.map((item) =>
                        Number(item.id)
                    );
                    req.io.emit("deleted_tache", delete_tache_id);
                }
            }

            const updated_stage = await prisma.stages.findUnique({
                where: { id: Number(id) },
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

            req.io.emit("updated_stage", updated_stage);
            res.status(200).send("Action reussite");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const fin_stage = async (req, res) => {
    try {
        const { id } = req.params;
        const preformance_data = req.body;
        const today = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.000'Z");

        const finished_stage = await prisma.stages.update({
            where: { id: Number(id) },
            data: {
                isNew: true,
                observation: stage_observations.acheve,
                status: false,
                date_fin: today,
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

        let updated_stage;
        let performance;

        if (finished_stage) {
            if (finished_stage.performance) {
                performance = await prisma.performances.update({
                    where: { id: Number(finished_stage.performance.id) },
                    data: {
                        ...preformance_data,
                    },
                    include: { stage: true },
                });

                updated_stage = await prisma.stages.findUnique({
                    where: { id: Number(id) },
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
                req.io.emit("updated_performance", performance);
            } else {
                performance = await prisma.performances.create({
                    data: {
                        stage_id: Number(finished_stage.id),
                        ...preformance_data,
                    },
                    include: { stage: true },
                });

                updated_stage = await prisma.stages.findUnique({
                    where: { id: Number(id) },
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

                req.io.emit("new_perf", performance);
            }

            const stagiaire = await prisma.stagiaires.update({
                where: { id: Number(updated_stage.stagiaire_id) },
                data: { observation: stagiaire_status.accompli },
                include: {
                    entretiens: true,
                    stages: true,
                },
            });

            req.io.emit("updated_stage", updated_stage);
            req.io.emit("update_stagiaire", stagiaire);
            res.status(200).send("Action reussite");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const abandon = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const stage = await prisma.stages.update({
            where: { id: Number(id) },
            data: {
                status: true,
                observation: stage_observations.abandon,
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

            const stagiaire = await prisma.stagiaires.update({
                where: { id: Number(stage.stagiaire_id) },
                data: {
                    observation: stagiaire_status.arret,
                },
                include: {
                    entretiens: true,
                    stages: true,
                },
            });

            if (stagiaire) {
                req.io.emit("update_stagiaire", stagiaire);
            }

            res.status(200).send({ message: "Action reussite !!!" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const booking = async (req, res) => {
    try {
        const { id } = req.params;
        const numero = req.body.numero
        const bookfile = req.files?.book?.[0];
        if (!bookfile) {
            return res.status(404).send("Veuillez inserer un fichier !");
        }

        let booklink = null;
        try {
            const response = await drive.files.create({
                requestBody: {
                    name: bookfile.originalname,
                    mimeType: bookfile.mimetype,
                    parents: [FOLDER_ID],
                },
                media: {
                    mimeType: bookfile.mimetype,
                    body: fs.createReadStream(bookfile.path),
                },
            });

            await drive.permissions.create({
                fileId: response.data.id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });

            booklink = `https://drive.google.com/file/d/${response.data.id}/view`;

            fs.unlink(bookfile.path, (err) => {
                if (err) console.error(`Error deleting file: ${err}`);
            });
        } catch (error) {
            return res.status(500).send({message: error.message});
        }

        if (!booklink) {
            return res.status(404).send("Veuillez inserer le livre numerique");
        }

        const finished_stage = await prisma.stages.update({
            where: { id: Number(id) },
            data: {
                isNew: false,
                status: false,
                book_link: booklink,
                observation: stage_observations.cloturation,
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


        if(finished_stage) {
            const stagiaire_updated = await prisma.stagiaires.update({
                where:{id: Number(finished_stage.stagiaire_id)},
                data:{
                    observation: stagiaire_status.finalisation,
                },
                include:{
                    entretiens:true,
                    stages:true
                }
            })

            req.io.emit('update_stagiaire' , stagiaire_updated)
            let stage = finished_stage;
            if(!finished_stage.attestation){
                const attestation = await prisma.attestation.create({
                    data:{
                        isNew: true,
                        status: false,
                        stage_id: finished_stage.id,
                        numero: numero,
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
                })

                stage = attestation.stage,
                req.io.emit('new_attestation' , attestation)
            }else{
                const attestation = await prisma.attestation.update({
                    where:{id: finished_stage.attestation.id},
                    data:{
                        status: false,
                        isNew: true,
                        isInforme: false,
                        isCollected: false,
                        numero: numero,
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
                })

                stage = attestation.stage
                req.io.emit("updated_attestation", attestation);
            }
            req.io.emit('updated_stage' , stage)
        }

        res.status(200).send("Action reussite !");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

////////////////////////////////////////////////////////////////////////////////

export const deleteStage = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.stages.delete({
            where: { id: Number(id) },
        });
        res.status(200).send({ message: "Element supprimé avec succes" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


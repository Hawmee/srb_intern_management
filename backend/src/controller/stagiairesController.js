import { error } from "console";
import { drive, FOLDER_ID } from "../config/GDrive.js";
import prismaClient from "./prismaClient.js";
import fs from "fs";
import { stagiaire_status } from "../utils/Observations.js";
import { message } from "../utils/message.js";

const prisma = prismaClient;

export const getAllStagiaire = async (req, res) => {
    try {
        const stagiaires = await prisma.stagiaires.findMany({
            include: {
                entretiens: true,
                stages: true ,
            },
        });
        res.status(200).send(stagiaires);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const createStagiaire = async (req , res) =>{
    const data = req.body
    try {
        const stagiaire = await prisma.stagiaires.create({
            data:{
                observation: stagiaire_status.postulant,
                ...data
            },
            include: {
                entretiens: true,
                stages: true ,
            },
        })
        if(stagiaire){
            req.io.emit('new_stagiaire', stagiaire )
            return res.status(200).send({ message: "Ajouté avec succès !" });
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

export const newStagiaire = async (req, res) => {
    const stagiaire_data = req.body;
    let fileLinks = { cv_link: null, lm_link: null };
    
    try {
        const files = req.files;
        const expectedFiles = ["cv_link", "lm_link"];

        for (const expectedFile of expectedFiles) {
            const file = files[expectedFile] ? files[expectedFile][0] : null;

            if (file) {
                try {
                    const uniqueFilename = `${Date.now()}--${file.originalname}`;
                    const response = await drive.files.create({
                        requestBody: {
                            name: uniqueFilename,
                            mimeType: file.mimetype,
                            parents: [FOLDER_ID],
                        },
                        media: {
                            mimeType: file.mimetype,
                            body: fs.ReadStream(file.path),
                        },
                    });

                    await drive.permissions.create({
                        fileId: response.data.id,
                        requestBody: { role: "reader", type: "anyone" },
                    });

                    const fileId = response.data.id;
                    fileLinks[expectedFile] = `https://drive.google.com/file/d/${fileId}/view`;

                    fs.unlink(file.path, (err) => {
                        if (err) res.status(500).send({message:err});
                    });
                } catch (fileError) {
                    return res.status(500).send({message: fileError})
                }
            }
        }

        const stagiaire = await prisma.stagiaires.create({
            data: {
                ...stagiaire_data,
                cv_link: fileLinks.cv_link,
                lm_link: fileLinks.lm_link,
                observation: stagiaire_status.postulant,
            },
            include: { 
                entretiens: true },
        });

        if (stagiaire) {
            req.io.emit("new_stagiaire", stagiaire);
            return res.status(200).send({ message: "Ajouté avec succès !" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
};

export const partialUpdateStagiaire = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const files = req.files;

    try {
        const stagiaire = await prisma.stagiaires.findUnique({ where: { id: Number(id) } });

        if (!stagiaire) {
            return res.status(404).send({ message: "Stagiaire not found" });
        }

        const fileUpdates = { cv_lien: stagiaire.cv_lien, lm_lien: stagiaire.lm_lien }; 
        const expectedFiles = ["cv_lien", "lm_lien"];
        const newLinks = [];
        let uploadErrorOccurred = false;
        let filesAdded = false; 

        for (const fileField of expectedFiles) {
            const file = files?.[fileField]?.[0];

            if (file) {
                filesAdded = true; 
                try {
                    const oldFileId = stagiaire[fileField]?.split('/d/')[1]?.split('/')[0];
                    if (oldFileId) await drive.files.delete({ fileId: oldFileId });

                    const uniqueFilename = `${Date.now()}--${file.originalname}`;
                    const response = await drive.files.create({
                        requestBody: { name: uniqueFilename, mimeType: file.mimetype, parents: [FOLDER_ID] },
                        media: { mimeType: file.mimetype, body: fs.createReadStream(file.path) },
                    });

                    await drive.permissions.create({ fileId: response.data.id, requestBody: { role: "reader", type: "anyone" } });
                    const link = `https://drive.google.com/file/d/${response.data.id}/view`;
                    fileUpdates[fileField] = link;
                    newLinks.push(link);
                } catch (uploadError) {
                    console.error(`Failed to upload ${fileField}: ${uploadError.message}`);
                    uploadErrorOccurred = true;
                } finally {
                    fs.unlink(file.path, (err) => { if (err) console.error(`Error deleting file: ${err}`); });
                }
            }
        }

        const updatedStagiaire = await prisma.stagiaires.update({
            where: { id: Number(id) },
            data: { ...updateData, ...fileUpdates },
            include:{entretiens:true , stages:true}
        });

        req.io.emit("update_stagiaire", updatedStagiaire);

        updatedStagiaire.entretiens.forEach(entretien => {
            const updatedEntretien = {
                ...entretien,
                stagiaire: updatedStagiaire
            };
            req.io.emit("updated_entretient", updatedEntretien);
        });

        updatedStagiaire.stages.forEach(stage => {
            const updated_stage = {
                ...stage,
                stagiaire: updatedStagiaire
            };
            req.io.emit("updated_stage", updated_stage);
        });
 
        if (!filesAdded) {
            return res.status(200).send({ message: "Aucun nouveau fichier importé.", type: "info" });
        }
        if (uploadErrorOccurred) {
            return res.status(200).send({ message: "Action réussie, mais certaines erreurs d'importation de documents (vérifiez votre connexion).", type: "warning" });
        }

        res.status(200).send({ message: "Action réussie !", type: "success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


export const addFilesToStagiaire = async (req, res) => {
    const { id } = req.params;
    const files = req.files;

    try {
        const stagiaire = await prisma.stagiaires.findUnique({
            where: { id: Number(id) },
        });

        if (!stagiaire) {
            return res.status(404).json({ message: "Stagiaire non existant !!" });
        }

        const fileUpdates = {};
        const expectedFiles = ["cv_link", "lm_link"];

        for (const fileField of expectedFiles) {
            const file = files?.[fileField]?.[0];

            if (file) {
                try {
                    // Upload new file to Google Drive
                    const uniqueFilename = `${Date.now()}--${file.originalname}`;
                    const response = await drive.files.create({
                        requestBody: {
                            name: uniqueFilename,
                            mimeType: file.mimetype,
                            parents: [FOLDER_ID],
                        },
                        media: {
                            mimeType: file.mimetype,
                            body: fs.createReadStream(file.path),
                        },
                    });

                    await drive.permissions.create({
                        fileId: response.data.id,
                        requestBody: { role: "reader", type: "anyone" },
                    });

                    const link = `https://drive.google.com/file/d/${response.data.id}/view`;
                    fileUpdates[fileField] = link;
                } catch (uploadError) {
                    console.error(`Failed to upload ${fileField}: ${uploadError.message}`);
                } finally {
                    fs.unlink(file.path, (err) => { if (err) console.error(`Error deleting file: ${err}`); });
                }
            }
        }

        
        if(Object.keys(fileUpdates).length === 0){
            return res.status(400).send({message:"Acune connexion internet . Reessayez plus tard !"})
        }

        const updatedStagiaire = await prisma.stagiaires.update({
            where: { id: Number(id) },
            data: fileUpdates,
            include:{stages:true , entretiens:true}
        });

        updatedStagiaire.entretiens.forEach(entretien => {
            const updatedEntretien = {
                ...entretien,
                stagiaire: updatedStagiaire
            };
            req.io.emit("updated_entretient", updatedEntretien);
        });

        updatedStagiaire.stages.forEach(stage => {
            const updated_stage = {
                ...stage,
                stagiaire: updatedStagiaire
            };
            req.io.emit("updated_stage", updated_stage);
        });

        req.io.emit("update_stagiaire", updatedStagiaire);
        res.status(200).send({ message: "Files added ", stagiaire });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const deleteStagiaire = async (req, res) => {
    const { id } = req.params;
    try {
        const stagiaire = await prisma.stagiaires.findUnique({
            where: { id: Number(id) },
        });

        if (!stagiaire) {
            return res.status(404).send({ message: "Stagiaire non existant !" });
        }

        const fileLinks = [stagiaire.cv_link, stagiaire.lm_link].filter(Boolean);

        // Attempt to delete files from Google Drive
        if (fileLinks.length > 0) {
            try {
                for (const link of fileLinks) {
                    const fileId = link.split('/d/')[1]?.split('/')[0];
                    if (fileId) {
                        await drive.files.delete({ fileId });
                    }
                }
            } catch (fileError) {
                console.warn("Failed to delete files from Google Drive:", fileError.message);
            }
        }

        await prisma.stagiaires.delete({
            where: { id: Number(id) },
        });

        req.io.emit("deleted_stagiaire", Number(id));
        res.status(200).send({ message: "Stagiaire Supprimé avec succès" });
    } catch (error) {
        console.error("Error deleting stagiaire:", error);
        res.status(400).send({ message: error.message });
    }
};

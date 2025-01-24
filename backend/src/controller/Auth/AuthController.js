import bcrypt from "bcrypt";
import prismaClient from "../prismaClient.js";
import dotenv from 'dotenv'

const prisma = prismaClient;
const salt_round = 10;

dotenv.config()

export const login = async (req, res) => {
    const { matricule, password } = req.body;

    try {
        const user = await prisma.users.findUnique({
            where: {
                matricule: matricule,
            },
            include:{
                unite:true,
            },
        });

        if (user) {
            const ismatch = await bcrypt.compare(password, user.password);
            if (ismatch) {
                const { password, ...client_user } = user;
                req.session.user = client_user
                res.status(200).send({ message: "Authentifié avec succes" ,data:client_user});
            } else {
                res.status(400).send({
                    message: "Mot de Passe incorrecte, veuillez le resaisir !",
                });
            }
        } else {
            res.status(400).send({
                message:
                    "Utilisateur inconnu, veuillez vérifier les informations saisies !",
            });
        }
    } catch (error) {
        res.status(400).send({message : error.message});
    }
};

export const register = async (req, res) => {
    const {
        nom,
        prenom,
        email,
        status,
        matricule,
        pass_word,
        confirmation,
        isChefService,
        isChefUnit,
        isPersCellule,
        isPersSecretariat,
        unit_id,
    } = req.body;

    try {
        if (pass_word == confirmation) {
            const hashed_password = await bcrypt.hash(pass_word, salt_round);

            const existing_user = await prisma.users.findUnique({
                where: { matricule: matricule },
            });

            if (existing_user) {
                return res.status(400).send({
                    message:
                        "Matricule déjà utilisée, veuillez changer la matricule !",
                });
            }

            const user = await prisma.users.create({
                data: {
                    matricule: matricule,
                    password: hashed_password,
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    status: status,
                    isChefService: isChefService,
                    isChefUnit: isChefUnit,
                    isPersCellule: isPersCellule,
                    isPersSecretariat: isPersSecretariat,
                    unite_id: unit_id,
                },
                include:{
                    unite:{
                        include:{
                            users:true
                        }
                    }
                }
            });

            const { password, ...client_user } = user;

            req.session.user = client_user;
            req.io.emit("new_user", user);
            res.status(200).send(client_user);
        } else {
            res.status(401).send({
                message: "Mot de passe et confirmation non identique",
            });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).send({ message: "Erreur durant la requete" });
        }
        res.clearCookie("userCookie");
        res.status(200).send({ message: "Deconnecté avec succes !" });
    });
};


export const cookie_handling = (req, res) => {
    if (req.session.user) {        
        res.send(req.session.user);
    } else {
        res.send(null);
    }
};
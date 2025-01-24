import bcrypt from "bcrypt";
import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllUser = async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            include:{unite:{
                include:{
                    users:true
                }
            }}
        })

        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newUser = async (req, res) => {
    const user_data = req.body
    try {
        const user = await prisma.users.create({
            data: user_data , 
            include:{
                unite:{
                    include:{
                        users:true
                    }
                },
            }
        })
        res.status(200).send({data: user})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const validateUser = async(req,res)=>{
    const {id} = req.params
    const user = req.body
    try {
        const validated = await prisma.users.update({
            where:{id: Number(id)},
            data:{
                status: true ,
                isNew:false
            },
            include:{
                unite:{
                    include:{
                        users:true
                    }
                },
            }
        })

        req.io.emit(`user_validated/${user.matricule}` , {
            message:"Votre compte a été validé ; Veuillez vous reconnecter !!!",
            isPopup:true
        })

        req.io.emit("user_validated" , validated)

        res.status(200).send()
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}




export const partialUpdateUser = async (req, res) => {
    const {id} = req.params
    const updated_user_data = req.body
    try {
        const updatedUser = await prisma.users.update({
            where:{id: Number(id)},
            data: updated_user_data ,
            include:{
                unite:{
                    include:{
                        users:true
                    }
                },
            }
        })

        const unites = await prisma.unites.findUnique({
            where: {id: Number(updatedUser.unite_id)},
            include: {
                sur_division:true,
                stages: true,
                users:true,
            }
        })

        if(updatedUser){
            const stages = await prisma.stages.findMany({
                where:{id: Number(updatedUser.unite_id) },
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
            req.io.emit("updated_stage", stages);
        }        
        req.io.emit('updated_unit' , unites)
        req.io.emit('updated_user' , updatedUser)
        res.status(200).send("Action reussite")
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const update_password = async(req,res)=>{
    const {id}= req.params
    const {password , ...updated_data} = req.body
    const salt_round = 10;
    const hashed_password = await bcrypt.hash(password , salt_round)

    try {
        const updated_password = await prisma.users.update({
            where:{id: Number(id)},
            data:{
                ...updated_data,
                password: hashed_password,
            },
            include:{
                unite:{
                    include:{
                        users:true
                    }
                },
            }
        })
        req.io.emit('updated_user' , updated_password)
        res.status(200).send("Action reussite")
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    const {id}= req.params
    try {
        await prisma.users.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element supprimé avec succes"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

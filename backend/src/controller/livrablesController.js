import prismaClient from "./prismaClient"


const prisma = prismaClient

export const getAllLivrables= async()=>{
    try {
        const livrables = await prisma.livrables.findMany({
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
        res.status(200).send(attestation);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export const newLivrale = async(req,res)=>{
    const data = req.body
    try {
         const livrable = await prisma.livrables.create({
            data:{
                isAttestation:false,
                isNew:true,
                status:true,
                isInforme:true,
                ...data
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

         if(livrable){
            req.io.emit('new_livrable')
            if(livrable.status){

            }
         }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}
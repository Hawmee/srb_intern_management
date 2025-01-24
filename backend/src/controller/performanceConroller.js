import prismaClient from "./prismaClient.js";
const prisma = prismaClient;

export const getAllPerf = async (req, res) => {
    try {
        const perfs = await prisma.performances.findMany({
            include:{
                stage:{
                    include:{
                        stagiaire:{
                            include:{
                                entretiens:true ,
                                stages:true,
                            }
                        }
                    }
                }
            }
        })

        res.status(200).send(perfs)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newPerf = async (req, res) => {
    const perf_data = req.body
    try {
        const perf = await prisma.performances.create({
            data: perf_data
        })
        res.status(200).send({data: perf})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdatePerf = async (req, res) => {
    const {id} = req.params
    const updated_perf_data = req.body
    try {
        const perf = await prisma.performances.update({
            where:{id: Number(id)},
            data: updated_perf_data
        })

        res.status(200).send({data: perf})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deletePerf = async (req, res) => {
    const {id}= req.params
    try {
        await prisma.performances.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element supprimé avec succes"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

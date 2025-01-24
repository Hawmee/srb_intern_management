import prismaClient from "../src/controller/prismaClient.js";
import bcrypt from "bcrypt";

const prisma = prismaClient;

const main = async () => {
    const hashed_password = await bcrypt.hash("0000", 10);
      

    await prisma.users.create({
        data: {
            matricule: "0000",
            password: hashed_password,
            nom: "chef",
            prenom: "Service Budget",
            email: "chef@mail.com",
            status: true,
            isChefService: true,
            isChefUnit: false,
            isPersCellule: false,
            isPersSecretariat: false,
            isNew:false,
            unite_id: null,
        },
    });

    await prisma.unites.createMany({
        data: [
            {
                nom: "Cellule d'Appui",
                isDivision: false,
                isBureau: true,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "B A A F",
                isDivision: false,
                isBureau: true,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "Secretariat",
                isDivision: false,
                isBureau: true,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "D P E",
                isDivision: true,
                isBureau: false,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "D C F L T E",
                isDivision: true,
                isBureau: false,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "D E B R F M",
                isDivision: true,
                isBureau: false,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "C I R",
                isDivision: true,
                isBureau: false,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "B V A",
                isDivision: false,
                isBureau: true,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "B M T A",
                isDivision: false,
                isBureau: true,
                isDependant: false,
                division_id: null,
            },
            {
                nom: "B L B A",
                isDivision: false,
                isBureau: true,
                isDependant: false,
                division_id: null,
            },
        ],
    });

    const DPE = await prisma.unites.findFirst({
        where: { nom: "D P E" },
    });

    await prisma.unites.updateMany({
        where: {
            nom: {
                in: ["B V A", "B M T A", "B L B A"],
            },
        },
        data: { division_id: DPE.id },
    });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import { format } from "date-fns";
import { formatDate } from "../../../../functions/Functions";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { inform } from "../../../../services/mail";

function Mail({ handleMail, data }) {
    const stage = data
    const stagiaire = stage.stagiaire
    const method = useForm()
    const { reset } = method;
    const [isLoading, setIsLoading] = useState(false);
    const [footer] = useState(
        `\n---- \nCellule d'appui et Coordination \nService Régional du Budget Vakinankaratra`
    );

    const content = (text) => {
        return `${text} \n${footer}`;
    };

    const submit = async(data) => {
        setIsLoading(true);
        const body = {
            ...data,
            content: content(data.content),
        };
        try {
            const sent = await inform.finalisation(body)
            if(sent){
                const message = "Mail envoyé avec success !";
                handleMail();
                notifySuccess(message);
            }
        } catch (error) {
            console.log(error);
            const message = ""
            notifyError();
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };

    useEffect(() => {
        if (data) {
            const NomStagiaire = `${stagiaire.nom.toUpperCase()} ${stagiaire.prenom}`;
            const receiver = stagiaire.email;

            const Message = `Bonjour ${NomStagiaire} ,\nSuite à l'achèvement de votre stage ,\nNous vous prions de nous envoyer la version finale et numerique de votre Rapport de stage corrigé , dans le but de finaliser et cloturer votre stage au sein de SRB Vakinankaratra .
            \nMerci de votre comprehension.`;

            reset({
                content: Message,
                receiver_mail: receiver,
            });
        }
    }, [data]);

    return (
        <FormProvider {...method}>
            <form
                onSubmit={method.handleSubmit(onSubmit)}
                className="min-w-[25vw] py-2"
            >
                <div className="mb-3">
                    <Input
                        label="Destinataire"
                        name="receiver_mail"
                        type="email"
                        disabled={isLoading}
                    />
                </div>
                <div className="mb-3">
                    <TextArea
                        label="Contenu"
                        name="content"
                        validation={{ required: "Valeure requise" }}
                        disabled={isLoading}
                    />
                </div>
                <div className="text-white mt-5 flex flex-row justify-end">
                    <button
                        className="px-4 py-1 bg-gray-600 rounded-[8px] hover:bg-gray-700 mr-2 disabled:opacity-50"
                        onClick={() => {
                            handleMail();
                        }}
                        type="button"
                        disabled={isLoading}
                    >
                        Annuler
                    </button>
                    <button
                        className="px-4 py-1 bg-blue-500 rounded-[8px] hover:bg-blue-600 disabled:opacity-50 flex items-center"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Envoi en cours...
                            </>
                        ) : (
                            'Envoyer'
                        )}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

export default Mail;
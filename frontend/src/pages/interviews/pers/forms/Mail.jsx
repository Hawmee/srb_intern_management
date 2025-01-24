import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import { format } from "date-fns";
import { formatDate } from "../../../../functions/Functions";
import axios from "axios";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";

function Mail({ handleMail, method, data }) {
    const url = useSelector((state) => state.backendUrl.value);
    const { reset } = method;
    const interview_id = data.id;
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
            interview_id: interview_id,
        };

        try {
            const sent = await axios.post(`${url}/informStagiaire`, body);
            if(sent){
                const message = "Mail envoyé avec success !";
                handleMail();
                notifySuccess(message);
            }
        } catch (error) {   
            const message = 'Verifiez votre connexion ou l\'adresse email du destinataire'
            console.log(error);
            notifyError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };

    useEffect(() => {
        if (data) {
            const NomStagiaire = `${data.stagiaire.nom} ${data.stagiaire.prenom}`;
            const receiver = data.stagiaire.email;
            const date = format(
                formatDate(data.date_entretien),
                "dd/MM/yyyy à HH:mm"
            );

            const Message = `Bonjour ${NomStagiaire} ,\nD'apres votre demande de stage au sein du SRB Vakinankaratra ,\nNous avons le plaisir de vous informer que vous êtes convoqué à un entretien pour le stage le ${date}.
            \nMerci de confirmer votre présence.`;

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
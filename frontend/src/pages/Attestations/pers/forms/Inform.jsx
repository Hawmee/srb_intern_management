import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import { today_string } from "../../../../functions/Functions";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import axios from "axios";
import { Loader2 } from "lucide-react";

function Inform({onInform, data}) {
    const url = useSelector((state) => state.backendUrl.value);
    const attestation = data.attestation;
    const method = useForm();
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
            const sent = await axios.patch(`${url}/attetation/inform/${attestation.id}`, body);
            if(sent){
                const message = "Mail envoyé avec success !";
                onInform();
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
            const today = today_string();

            const Message = `Bonjour ${NomStagiaire} ,\nSuite à l'aboutissement de votre stage au sein du SRB Vakinankaratra ,\nNous avons le plaisir de vous informer que votre attestation de stage est désormais disponible depuis le ${today}.
            \nVous pouvez venir la récupérer à votre convenance , en presentant ce numero: ${attestation.numero} au niveau de la Cellule d'Appui.\nN'hésitez pas à nous contacter pour toute question ou précision.`;

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
                            onInform();
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

export default Inform;
import React, { useEffect } from "react";
import Input from "../../../components/forms/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Redo2 } from "lucide-react";
import { notifyError, notifySuccess } from "../../../layouts/MereLayout";
import { useSelector } from "react-redux";
import { account } from "../../../services/account";
import { isArrayNotNull } from "../../../functions/Functions";

function PassWord() {
    const current_user = useSelector((state) => state.currentUser.value);
    const accounts = useSelector((state) => state.account.value);
    const user = isArrayNotNull(accounts)
        ? current_user&& (accounts.find((item) => Number(item.id) == Number(current_user.id)))
        : current_user;
    const method = useForm();
    const { reset } = method;

    const __reset = () => {
        reset();
    };

    const submit = async (data) => {
        const { unite, id, unite_id, ...userData } = user;
        const body = {
            ...userData,
            password: data.password,
        };
        const verification = {
            pwd: data.password,
            pwd_conf: data.password_verification,
        };

        if (verification.pwd !== verification.pwd_conf) {
            const message =
                "Veuillez assurer que les valeurs entrées sont identiques !";
            reset();
            return notifyError(message);
        }

        try {
            const new_pass = await account.new_password(id, body);
            if (new_pass) {
                notifySuccess();
            }
        } catch (error) {
            console.log(error);
            notifyError();
        }

        reset();
    };

    const onSubmit = (data) => {
        submit(data);
    };

    return (
        <>
            <FormProvider {...method}>
                <form
                    className="w-[20vw]"
                    onSubmit={method.handleSubmit(onSubmit)}
                >
                    <div className="mb-3">
                        <Input
                            label={"Nouveau de Passe"}
                            name={"password"}
                            validation={{ required: "Valeure requise" }}
                            type="password"
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            label={"Confirmation du mot de passe"}
                            name={"password_verification"}
                            validation={{ required: "Valeure requise" }}
                            type="password"
                        />
                    </div>
                    <div className="fl-row justify-end mt-6">
                        <button
                            className="mr-3"
                            type="button"
                            onClick={() => {
                                __reset();
                            }}
                        >
                            <Redo2 />
                        </button>
                        <button className="btn-primary">Enregistrer</button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default PassWord;

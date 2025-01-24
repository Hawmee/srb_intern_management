import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../components/forms/Input";
import { Redo2 } from "lucide-react";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../layouts/MereLayout";
import { account } from "../../../services/account";
import { isArrayNotNull } from "../../../functions/Functions";

function Account({ data }) {
    const current_user = useSelector((state) => state.currentUser.value);
    const accounts = useSelector((state) => state.account.value);
    const user = isArrayNotNull(accounts)
        ? current_user&&(accounts.find((item) => Number(item.id) == Number(current_user.id)))
        : current_user;
    const method = useForm();
    const { reset } = method;

    const __reset = () => {
        if (data) {
            reset({
                matricule: data.matricule,
            });
        }
    };

    const submit = async (data) => {
        const { unite, id, ...user_data } = user;
        const body = {
            ...user_data,
            ...data,
        };
        try {
            const submited = await account.update(id, body);
            if (submited) {
                notifySuccess();
            }
        } catch (error) {
            console.log(error);
            notifyError();
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };

    useEffect(() => {
        __reset();
    }, [data]);

    return (
        <>
            <FormProvider {...method}>
                <form
                    className="w-full"
                    onSubmit={method.handleSubmit(onSubmit)}
                >
                    <div className="mb-3 w-[20vw]">
                        <Input label={"Numero Matricule"} name="matricule" />
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

export default Account;

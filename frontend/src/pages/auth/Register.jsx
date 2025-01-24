import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../features/currentUser";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { isArrayNotNull } from "../../functions/Functions";

function Register() {
    const url = useSelector((state) => state.backendUrl.value);
    const toastConfig = useSelector((state) => state.toastConfig.value);
    const units = useSelector((state) => state.unit.value);
    const dispatch = useDispatch();
    const methods = useForm();
    const { watch, setValue, reset } = methods;

    const role = watch("role");

    const register = async (data) => {
        try {
            const currentUser = await axios.post(`${url}/register`, data);
            dispatch(setCurrentUser(currentUser.data));
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message, toastConfig);
        }
    };

    const onSubmit = (data) => {
        const register_data = {
            ...data,
            unit_id: data.unit_id ? Number(data.unit_id) : null,
            status: data.role === "isChefService" ? true : false,
            isChefService: data.role === "isChefService",
            isChefUnit: data.role === "isChefUnit",
            isPersCellule: data.role === "isPersCellule",
            isPersSecretariat: data.role === "isPersSecretariat",
        };

        delete register_data.role;

        register(register_data);
        // console.log(register_data);
    };

    const units_options =
        isArrayNotNull(units)
            ? [
                  { value: "", label: "Unité de travail" },
                  ...units.map((unit) => ({
                      value: Number(unit.id),
                      label: unit.nom,
                      name,
                  })),
              ]
            : [{ value: "", label: "Sur-Unité" }];

    useEffect(() => {
        console.log(role);

        if (role == "isPersCellule") {
            const unit_id =
                units_options.find((unit) => unit.label == "Cellule d'Appui")
                    ?.value || "";
            setValue("unit_id", unit_id);
        }

        if (role == "isPersSecretariat") {
            const unit_id =
                units_options.find((unit) => unit.label == "Secretariat")
                    ?.value || "";
            setValue("unit_id", unit_id);
        }
    }, [role]);

    return (
        <>
            <div className="h-full w-full bg-gray-200 flex flex-col justify-center items-center">
                <div className="bg-white rounded p-4 min-w-[30vw]">
                    <FormProvider {...methods}>
                        <form className="min-w-32" onSubmit={methods.handleSubmit(onSubmit)}>
                            <div className="mt-6">
                                <Input
                                    label={"Matricule"}
                                    name={"matricule"}
                                    type="text"
                                    validation={{
                                        required: "Valeur requise .",
                                        maxLength: {
                                            value: 50,
                                            message:
                                                "Trop long , veuillez redefinir",
                                        },
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "valeur inappropriée ",
                                        },
                                        validate: {
                                            pasSeulementEspace: (value) => {
                                                value.trim() !== "" ||
                                                    "Valeur requise.";
                                            },
                                        },
                                    }}
                                />
                            </div>

                            <div className="mt-2">
                                <Input
                                    label={"Nom"}
                                    name={"nom"}
                                    type="text"
                                    validation={{
                                        required: "Valeur requise .",
                                        maxLength: {
                                            value: 50,
                                            message:
                                                "Trop long , veuillez redefinir",
                                        },
                                        pattern: {
                                            value: /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/,
                                            message: "valeur innappropriée ",
                                        },
                                        validate: {
                                            pasSeulementEspace: (value) => {
                                                value.trim() !== "" ||
                                                    "Valeur requise.";
                                            },
                                        },
                                    }}
                                />
                            </div>

                            <div className="mt-2">
                                <Input
                                    label={"Prenom"}
                                    name={"prenom"}
                                    type="text"
                                    validation={{
                                        required: "Valeur requise .",
                                        maxLength: {
                                            value: 50,
                                            message:
                                                "Trop long , veuillez redefinir",
                                        },
                                        pattern: {
                                            value: /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/,
                                            message:
                                                "valeur alphabetique seulement ",
                                        },
                                        validate: {
                                            pasSeulementEspace: (value) => {
                                                value.trim() !== "" ||
                                                    "Valeur requise.";
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <div className="mt-2">
                                <Input
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="entrez votre mail"
                                    validation={{
                                        required: "Valeur requise.",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "format du mail invalide",
                                        },
                                    }}
                                    autoComplete="new-mail"
                                />
                            </div>

                            <div className="mt-2 flex flex-row justify-between">
                                <div>
                                    <Select
                                        label={"Type de Compte"}
                                        name={"role"}
                                        className="border-gray-300 border-[2px] rounded-[6px] p-2 w-[11vw] focus:bg-gray-100"
                                        options={[
                                            {
                                                value: "",
                                                label: "Type de compte",
                                            },
                                            {
                                                value: "isChefUnit",
                                                label: "Chef d'Unité (division/Bureau)",
                                            },
                                            {
                                                value: "isPersCellule",
                                                label: "Personnel du Cellule",
                                            },
                                            {
                                                value: "isPersSecretariat",
                                                label: "Personnel du secretariat",
                                            },
                                        ]}
                                        validation={{
                                            required: "valeur requise !",
                                        }}
                                    />
                                </div>
                                {role == "isChefUnit" && (
                                    <div className="ml-3">
                                        <Select
                                            label={"Unité de travail"}
                                            name={"unit_id"}
                                            className="border-gray-300 border-[2px] rounded-[6px] p-2 w-[11vw] focus:bg-gray-100"
                                            options={units_options}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <Input
                                    name="pass_word"
                                    label="Mot de passe"
                                    type="password"
                                    placeholder="entrez votre mot de passse"
                                    validation={{
                                        required: "Valeur requise.",
                                    }}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mt-2">
                                <Input
                                    name="confirmation"
                                    label="confirmation"
                                    type="password"
                                    placeholder="confirmer votre mot de passe"
                                    validation={{
                                        required: "Valeur requise.",
                                    }}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mt-6 flex justify-end ">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="mr-4 underline text-gray-500">
                                        <NavLink to="/guest/login">
                                            {" "}
                                            S'authentifier ?{" "}
                                        </NavLink>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-gray-700 text-white py-1 px-4 rounded-[8px] hover:bg-gray-600"
                                    >
                                        S'inscrire
                                    </button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                    {/* <Form onSubmit=></Form> */}
                </div>
            </div>
        </>
    );
}

export default Register;
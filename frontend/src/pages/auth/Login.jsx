import React from "react";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../features/currentUser";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const url = useSelector((state) => state.backendUrl.value);
    const toastConfig = useSelector((state) => state.toastConfig.value);

    const login = async (data) => {
        try {
            const logged_in = await axios.post(`${url}/login`, data, {
                withCredentials: true,
            });
            const message = logged_in.data.message;
            const current_user = logged_in.data.data;
            dispatch(setCurrentUser(current_user));
            toast.success(message, { toastConfig });
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message, toastConfig);
        }
    };

    const onSubmit = (data) => {
        login(data);
    };

    return (
        <>
            <div className="h-full w-full bg-gray-200 flex flex-col justify-center items-center">
                <div className="bg-white p-4 min-w-[25vw] rounded-lg">
                    <div className="text-center text-xl font-bold text-gray-700 ">
                        <p>S'authentifier</p>
                    </div>
                    <Form onSubmit={onSubmit}>
                        <div className="mt-6">
                            <Input
                                label={"Matricule"}
                                name={"matricule"}
                                validation={{
                                    required: "Valeur requise .",
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "Trop long , veuillez redefinir",
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message:
                                            "valeur inappropriée (seulement valeur numerique) ",
                                    },
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                name="password"
                                label="Mot de passe"
                                type="password"
                                placeholder="entrez votre mot de passse"
                                validation={{
                                    required: "Valeur requise.",
                                }}
                                autoComplete="off"
                            />
                        </div>

                        <div className="mt-6 flex justify-end items-center">
                            <div className="flex flex-row justify-between items-center ">
                                <div className="underline mr-3 text-gray-500">
                                    <NavLink to="/guest/register">
                                        S'inscrire
                                    </NavLink>
                                </div>
                                <button
                                    className="bg-gray-700 text-gray-50 px-4 py-1 rounded-[8px]"
                                    type="submit"
                                >
                                    S'authentifier
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Login;

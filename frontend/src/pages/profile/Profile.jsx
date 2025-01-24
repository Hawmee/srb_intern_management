import React from "react";
import MereLayout from "../../layouts/MereLayout";
import MainContainer from "../../components/containers/MainContainer";
import Personal_info from "./parts/Personal_info";
import Password from "./parts/Password";
import Compte from "./parts/Compte";
import { useSelector } from "react-redux";
import { isArrayNotNull } from "../../functions/Functions";

function Profile() {
    const current_user = useSelector((state) => state.currentUser.value);
    const accounts = useSelector((state) => state.account.value);
    const user = isArrayNotNull(accounts)
        ? current_user &&
          accounts.find((item) => Number(item.id) == Number(current_user.id))
        : current_user;
    const personal_info = user
        ? {
              nom: user.nom,
              prenom: user.prenom,
              mail: user.email,
          }
        : null;

    const account_info = user
        ? {
              matricule: user.matricule,
          }
        : null;

    return (
        <>
            <div className="py-3 mx-8">
                <MainContainer>
                    <div className="text-center text-gray-700">
                        <div className="text-xl underline underline-offset-4">
                            PROFILE
                        </div>
                    </div>
                    <div className="fl-col mt-6">
                        <div className="min-h-[20vh] mt-6 flex flex-row items-start justify-center text-gray-600 border-2 border-gray-200 p-8 rounded-2xl shadow-lg ">
                            <div className=" px-24 py-12">
                                <Personal_info data={personal_info} />
                            </div>
                            <div className="fl-col border-l-2 border-gray-300">
                                <div className="pb-6 px-24">
                                    <Compte data={account_info} />
                                </div>
                                <div className=" px-32 ">
                                    <div className="border-t-2 border-gray-300"></div>
                                </div>
                                <div className="px-24 ">
                                    <div className="py-6">
                                        <Password />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContainer>
            </div>
        </>
    );
}

export default Profile;

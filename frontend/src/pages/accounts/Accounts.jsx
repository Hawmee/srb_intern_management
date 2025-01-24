import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "../../features/accounts";
import CSAccounts from "./cs/CSAccounts";

function Accounts() {
    const current_user = useSelector((state)=>state.currentUser.value)

    return (
      <>
        {current_user&&(current_user.isChefService && <CSAccounts />)}
      </>
    )
}

export default Accounts;

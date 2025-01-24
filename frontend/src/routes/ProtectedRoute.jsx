import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ element }) {


  const current_user = useSelector((state)=>state.currentUser.value)
  const navigate = useNavigate()
  const [status , setStatus] = useState(true)


  useEffect(() => {

    if (current_user && !current_user.status) {
        navigate('/waiting')
    }


  }, [status]);

  return element

}

export default ProtectedRoute;

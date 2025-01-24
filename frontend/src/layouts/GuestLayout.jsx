import { Outdent } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function Guest() {

  const selecor = useSelector;
  const navigate = useNavigate();
  const user = selecor((state)=>state.currentUser.value)

  useEffect(()=>{
    if(!user){
      navigate('/guest/login')
    }else{
      navigate('/')
    }
  } , [user])

  return (
    <>
      <div className="h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default Guest;

import React from "react";
import MereLayout from "../../layouts/MereLayout";

function WaitingPage() {
  return (
    <>
      <MereLayout>
        <div> </div>
        <div className="flex flex-col justify-center items-center h-full text-[22px] bg-gray-200">
            Votre compte est sous verification . Veuillez patientier .
        </div>
      </MereLayout>
    </>
  );
}

export default WaitingPage;

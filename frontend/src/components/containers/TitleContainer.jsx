import React from "react";

function TitleContainer({ children }) {
    return (
        <>
            <div className="px-12 mb-4 text-center text-lg">
                <div className=" under-line pb-2">
                    {children}
                </div>
            </div>
        </>
    );
}

export default TitleContainer;

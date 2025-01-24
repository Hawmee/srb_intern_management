import React from "react";

function SearchContainer({ children }) {
    return (
        <>
            <div className="h-14 px-4 flex flex-row items-center">
                {children}
            </div>
        </>
    );
}

export default SearchContainer;

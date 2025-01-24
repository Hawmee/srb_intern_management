// import React from 'react'
import MereLayout from "../MereLayout";
import SidebarContents from "../../components/SidebarContent.jsx";
import { SideBarLinks } from "../../components/Sidebar.jsx";
import { BookUser, Handshake, MailOpen, NotebookText } from "lucide-react";
import { Outlet } from "react-router-dom";

function PersSecLayout() {
    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<MailOpen />}
                        text={"Demande"}
                        href={"/persSecretariat/"}
                    />
                </SidebarContents>
                <div className={"h-full"}>
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default PersSecLayout;

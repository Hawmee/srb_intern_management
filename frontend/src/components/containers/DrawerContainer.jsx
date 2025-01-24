import React from "react";
import { Button } from "@nextui-org/react";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
} from "@nextui-org/drawer";

function DrawerContainer({ isOpen, onOpenChange, children }) {
    return (
        <>
            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="right"
                motionProps={{
                    variants: {
                        enter: {
                            x: "0",
                            opacity: 1,
                            transition: {
                                duration: 0.2,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            x: "100%",
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    },
                }}
            >
                <DrawerContent>
                    <>
                        <DrawerHeader className="flex flex-col gap-1 text-center px-16 ">
                            <div className="border-b-2 border-gray-300 pb-2 ">
                                Details
                            </div>
                        </DrawerHeader>
                        <DrawerBody>
                            {children}
                        </DrawerBody>
                    </>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default DrawerContainer;

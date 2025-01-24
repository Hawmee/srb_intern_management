import { X } from "lucide-react";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
} from "@nextui-org/react";
function PopUpContainer({ isOpen , onOpenChange , popup, closePopUp, children }) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                placement="center"
                onOpenChange={onOpenChange}
                backdrop="blur"
                classNames={{
                    backdrop: "bg-black bg-opacity-50 backdrop-opacity-20"
                  }}
                  motionProps={{
                    variants: {
                      enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      },
                      exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                          duration: 0.2,
                          ease: "easeIn",
                        },
                      },
                    }
                  }}
            >
                <ModalContent className="bg-white rounded-2xl shadow-lg w-auto max-w-[90vw] mx-auto ">
                    <ModalBody className="p-0">
                        <div className="min-w-[12vh] min-h-[12vh] flex flex-col py-4 px-8">
                            {children}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* <div className="parent w-[100vw] h-[100vh] absolute left-0 top-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-[12] overflow-auto backdrop-blur py-12 ">
                <div className="parent relative flex flex-col justify-center items-center rounded-[15px]  bg-white  ">
                    {popup && (
                        <div className=" absolute top-0 right-0 mai text-gray-700 rounded-[12px] text-[2px] mr-[5px] mt-[5px] cursor-pointer hover:text-gray-800">
                            <button
                                onClick={() => {
                                    closePopUp(!popup);
                                }}
                                className="p-[2px] flex justify-center items-center"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}
                    <div className="min-w-[12vh] min-h-[12vh] flex flex-col py-4 px-8">
                        {children}
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default PopUpContainer;

import React, { useEffect, useState } from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { isArrayNotNull } from "../../../functions/Functions";
import { useDisclosure } from "@nextui-org/react";
import Add from "./forms/Add";
import Edit from "./forms/Edit";
import Delete from "./forms/Delete";
import { Search } from "lucide-react";

function CSUnits() {
    const units = useSelector((state) => state.unit.value);
    const [selected_unit, setSelected_unit] = useState(null);
    const add = useDisclosure();
    const edit = useDisclosure();
    const del = useDisclosure();
    const units_options = isArrayNotNull(units)
        ? [
              { value: "", label: "Sur-Unité" },
              ...units.map((unit) => ({
                  value: unit.id,
                  label: unit.nom,
              })),
          ]
        : [{ value: "", label: "Sur-Unité" }];

    const unit_type = [
        { value: "", label: "Type d'unité" },
        { value: "isDivision", label: "Division" },
        { value: "isBureau", label: "Bureau" },
    ];

    const handleAdd = () => {
        if (add.isOpen) {
            add.onClose();
        } else {
            add.onOpen();
        }
    };

    const handleEdit = (item) => {
        if (item) {
            edit.onOpen();
            setSelected_unit(item);
        } else {
            edit.onClose();
        }
    };

    const handleDelete = (item) => {
        if (item) {
            del.onOpen();
            setSelected_unit(item);
        } else {
            del.onClose();
        }
    };

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-8 mb-4">
                        <div className="flex flex-row justify-center items-end h-full">
                            <select
                                className="px-2 py-2 border-[2px] border-gray-400 rounded-[12px] cursor-pointer outline-none w-32"
                                // value={selectedStatus}
                                // onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="all">Tous</option>
                                <option value="Postulant">Division</option>
                                <option value="A entretenir">Bureau</option>
                            </select>
                        </div>

                        <div className="flex flex-row flex-1 h-full justify-end items-end">
                            <div className="flex flex-row text-gray-600 py-2 rounded-2xl bg-white px-2 border-2 ">
                                <input
                                    type="text"
                                    placeholder="Rechercher une unité"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    // onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="mr-1 px-1 flex flex-row items-center cursor-pointer">
                                    <Search size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SearchContainer>
                <div>
                    <Table
                        popup={add}
                        onAdd={handleAdd}
                        data={units}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </div>
            </MainContainer>

            <PopUpContainer isOpen={add.isOpen} onOpenChange={add.onOpenChange}>
                <Add
                    type={unit_type}
                    option={units_options}
                    handleAdd={handleAdd}
                />
            </PopUpContainer>

            <PopUpContainer
                isOpen={edit.isOpen}
                onOpenChange={edit.onOpenChange}
            >
                <Edit
                    data={selected_unit}
                    handleEdit={handleEdit}
                    type={unit_type}
                    option={units_options}
                />
            </PopUpContainer>
            <PopUpContainer isOpen={del.isOpen} onOpenChange={del.onOpenChange}>
                <Delete data={selected_unit} handleDelete={handleDelete} />
            </PopUpContainer>
        </>
    );
}

export default CSUnits;

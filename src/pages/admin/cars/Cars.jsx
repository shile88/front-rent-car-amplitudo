/*import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AddButton from "../../../components/buttons/addButton/AddButton";
import AddCar from "../addCar/AddCar";
import Button from "../../../components/buttons/button/Button";
import SearchField from "../../../components/search/Search";
import Table from "../../../components/table/Table";
import { carService } from "../../../services/CarService.js";
import classes from "./Cars.module.scss";
import { message } from "antd";
import { useModal } from "../../../context/ModalContex";
import { useState } from "react";
import withAuth from "../../../authHOC/authHOC";
import withRole from "../../../roleHOC/roleHOC";

const Cars = () => {
  const queryClient = useQueryClient();
  const { open, close } = useModal();
  const [query, setQuery] = useState("");
  

  const { data } = useQuery(
    ["vehicles", query],
    () => carService.getAll(query),
    {
      enabled: true,
      initialData: [],
    }
  );
  
  const deleteCategory = useMutation((data) =>
  carService
      .delete(data)
      .then((r) => {
        message.success("Succesfully deleted!");
        queryClient.invalidateQueries("vehicles");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        message.error("There has been an error!");
      })
  );

  const onDelete = (id) => {
    deleteCategory.mutate(id);
  };

  const header = [
    {
      title: "Plate Number",
      index: "plateNumber",
    },
    {
      title: "Production Year",
      index: "productionYear",
    },
    {
      title: "Type",
      index: "type",
    },
    {
      title: "Number of seats",
      index: "numberOfSeats",
    },
    {
      title: "Daily rate",
      index: "dailyRate",
    },
    {
      title: "Notes",
      index: "note",
    },
    {
      title: "Actions",
      index: null,
      render: (data) => {
        return (
          <div className={classes["action-buttons"]}>
            <Button label={"Edit"} onClick={() => openForm(data?.id)} />
            <Button label={"Delete"} onClick={() => onDelete(data?.id)} />
          </div>
        );
      },
    },
  ];

  const closeForm = () => {
    close();
  };

  const openForm = (id) => {
    open(
      "Cars",
      <AddCar key={`car-${id}`} id={id} close={closeForm} />
    );
  };

  return (
    <div className={`${classes["container"]} `}>   
      <h1>Cars</h1>
      <SearchField
        placeholder={"Insert plate number for search"}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        
      />
      <AddButton
        onClick={() => openForm(null)}
        className={classes["add-button"]}
      />
   
      <div className={classes["table-container"]}>
        <Table header={header} data={data.filter((item) => item.plateNumber.toLowerCase().includes(query.toLowerCase()))} />
      </div>
    </div>
  );
};

export default withRole(withAuth(Cars));*/
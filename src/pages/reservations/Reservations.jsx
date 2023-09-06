import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AddButton from "../../components/buttons/addButton/AddButton";
import Button from "../../components/buttons/button/Button";
import ReservationForm from "./reservationForm/ReservationForm";
import SearchField from "../../components/search/Search";
import Table from "../../components/table/Table";
import classes from "./Reservations.module.scss";
import { message } from "antd";
import { reservationService } from "../../services/ReservationService";
import { useModal } from "../../context/ModalContex";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Reservations = () => {
  const queryClient = useQueryClient();
  const { open, close } = useModal();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data } = useQuery(
    ["reservations", query],
    () => reservationService.getAll(query),
    {
      enabled: true,
      initialData: [],
    }
  );

  const deleteCategory = useMutation((data) =>
  reservationService
      .delete(data)
      .then((r) => {
        message.success("Succesfully deleted!");
        queryClient.invalidateQueries("reservations");
        queryClient.invalidateQueries("reservation-single");
        close();
      })
      .catch((err) => {
        console.log(err);
        message.error("There has been an error!");
      })
  );

  const onDelete = (id) => {
    deleteCategory.mutate(id);
  };

  const header = [
    {
      title: "First Name",
      index: "firstName",
    },
    {
      title: "Last Name",
      index: "lastName",
    },
    {
      title: "Plate number",
      index: "plateNumber",
    },
    {
      title: "Date from",
      index: "dateFrom",
    },
    {
      title: "Date to",
      index: "dateTo",
    },
    {
      title: "Pickup location",
      index: "locationPickup",
    },
    {
      title: "Dropoff location",
      index: "locationDropoff",
    },
    {
      title: "Total price",
      index: "priceTotal",
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
      "Reservation",
      <ReservationForm key={`reservation-${id}`} id={id} close={closeForm} />
    );
  };

  return (
    <div className={`${classes["container"]} `}>
      <h1>Reservations</h1>
      <div>
        <SearchField
          placeholder={"Insert first name or email for search"}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <AddButton
        onClick={() => navigate("/reservations/add")}
        className={classes["add-button"]}
      />

      <div className={classes["table-container"]}>
        <Table header={header} data={data} />
      </div>
    </div>
  );
};

export default Reservations;

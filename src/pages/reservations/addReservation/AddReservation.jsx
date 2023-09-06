import ReservationForm from "../reservationForm/ReservationForm";
import Table from "../../../components/table/Table";
import { useModal } from "../../../context/ModalContex";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { vehicleService } from "../../../services/VehicleService";

const AddReservation = () => {
    const [query, setQuery] = useState("");
    const {open, close} = useModal();

    const { data } = useQuery(
        ["vehicles", query],
        () => vehicleService.getAll(query),
        {
          enabled: true,
          initialData: [],
        }
      );

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
          title: "Number of seats",
          index: "numberOfSeats",
        },
        {
          title: "Daily rate",
          index: "dailyRate",
        },
      ];

      const closeForm = () => {
        close();
      };
    
      const openForm = (record) => {
        open(
          "Cars",
          <ReservationForm carData={record} close={closeForm} />
        );
      };

  return (
    <Table header={header} data={data} onRow={(record) => {
        return {
          onClick: () => {
            // Access data from the clicked row (record)
            openForm(record);
          },
          // ... other event handlers
        };
      }}/>
  );
};

export default AddReservation;

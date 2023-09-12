import PageContent from "../../../components/pageContent/PageContent";
import ReservationForm from "../reservationForm/ReservationForm";
import { useModal } from "../../../context/ModalContex";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { vehicleService } from "../../../services/VehicleService";

const AddReservation = () => {
  const [query, setQuery] = useState("");
  const { open, close } = useModal();

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

  const openForm = (record, disabled) => {
    open(
      "Reservation Info",
      <ReservationForm carData={record} close={closeForm} disabled={disabled}/>
    );
  };

  return (
    
    <PageContent
      title="Click on vehicle to rent"
      header={header}
      data={data}
      onRow={(record) => {
        return {
          onClick: () => {
            openForm(record, true);
          },
        };
      }}
    />
  );
};

export default AddReservation;

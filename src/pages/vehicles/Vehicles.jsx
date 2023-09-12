import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AddVehicle from "./addVehicle/AddVehicle";
import Button from "../../components/buttons/button/Button";
import PageContent from "../../components/pageContent/PageContent";
import { message } from "antd";
import { useModal } from "../../context/ModalContex";
import { useState } from "react";
import { vehicleService } from "../../services/VehicleService";

const Vehicles = () => {
  const queryClient = useQueryClient();
  const { open, close } = useModal();
  const [query, setQuery] = useState("");
  

  const { data } = useQuery(
    ["vehicles", query],
    () => vehicleService.getAll(query),
    {
      enabled: true,
      initialData: [],
    }
  );
  
  const deleteVehicle = useMutation((data) =>
  vehicleService
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
    deleteVehicle.mutate(id);
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
          <div >
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
      id ? 'Edit vehicle' : 'Add vehicle',
      <AddVehicle key={`vehicle-${id}`} id={id} close={closeForm} />
    );
  };

  return (
    <PageContent
      title="Vehicles"
      placeholder="Insert plate number for search"
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      onClick={() => openForm(null)}
      header={header}
      data={data.filter((item) => item.plateNumber.toLowerCase().includes(query.toLowerCase()))}
    />
  );
};

export default Vehicles;

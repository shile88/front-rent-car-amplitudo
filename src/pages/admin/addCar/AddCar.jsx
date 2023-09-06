import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CarValidation from '../../../validation/vehicleValidation/VehicleValidation';
import { carService } from "../../../services/VehicleService";
import { message } from "antd";

const AddCar = ({ id, close }) => {
  const queryClient = useQueryClient();

  const add = useMutation((data) =>
  carService
      .add(data)
      .then((r) => {
        message.success("Succesfully added!");
        queryClient.invalidateQueries("vehicles");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        message.error("There has been an error!");
      })
  );

  const edit = useMutation((data) =>
  carService
      .edit(data)
      .then((r) => {
        message.success("Sucessfully edited!");
        queryClient.invalidateQueries("customers");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        message.error("There has been an error!");
      })
  );

  const get = (id) => {
    return carService
      .get(id)
      .then((res) => {
        return res;
      })
      .catch((err) => message.error("There has been an error!"));
  };

  const onSave = (formData) => {
    const saveObject = { 
        plate_number: formData.plateNumber,
        production_year: formData.productionYear,
        type: formData.type,
        number_of_seats: formData.numberOfSeats,
        daily_rate: formData.dailyRate,
        note: formData.note,
        id: id ? id : ''
    }
    if (id) {
      edit.mutate(saveObject);
    } else {
      add.mutate(saveObject);
    }
  };

  const {data: singleCarData} = useQuery(["vehicle-single", id], () => get(id), {
    enabled: Boolean(id),
  });

console.log(singleCarData)
  return (
    <CarValidation onSave={onSave}/>
  );
};

export default AddCar;

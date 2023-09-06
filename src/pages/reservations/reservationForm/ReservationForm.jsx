import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import EditReservationValidation from "../../../validation/reservationValidation/editReservationValidation";
import ReservationValidation from "../../../validation/reservationValidation/reservationValidation";
import { cityService } from "../../../services/CityService";
import { customerService } from "../../../services/CustomerService";
import { format } from "date-fns";
import { message } from "antd";
import { reservationService } from "../../../services/ReservationService";

const ReservationForm = ({ carData, id }) => {
  const queryClient = useQueryClient();

  const { data: customersData } = useQuery(
    ["customers-data"],
    () => customerService.getAll(),
    {
      enabled: true,
      initialData: [],
    }
  );

  const { data: citiesData } = useQuery(
    ["cities-data"],
    () => cityService.getCitiesData(),
    {
      enabled: true,
      initialData: [],
    }
  );

  const add = useMutation((data) =>
    reservationService
      .add(data)
      .then((r) => {
        message.success("Succesfully added!");
        queryClient.invalidateQueries("vehicles");
        close();
      })
      .catch((err) => {
        console.log(err);
        message.error("There has been an error!");
      })
  );

  const edit = useMutation((data) =>
    reservationService
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
    return reservationService
      .get(id)
      .then((res) => {
        console.log(res)
        return res;
      })
      .catch((err) => message.error("There has been an error!"));
  };

  const onSave = (formData) => {
    const saveObject = {
      date_from: format(formData.dateFrom, "yyyy-MM-dd"),
      date_to: format(formData.dateTo, "yyyy-MM-dd"),
      customer_id: formData.customer,
      pickup_location: formData.locationPickup,
      drop_off_location: formData.locationDropoff,
      vehicle_id: carData.id,
      price: formData.priceTotal,
    };
    if (id) {
      edit.mutate(formData);
    } else {
      add.mutate(saveObject);
    }
  };

  const { data: singleReservationData } = useQuery(
    ["reservation-single", id],
    () => get(id),
    {
      enabled: Boolean(id),
    }
  );

  return (
    <>
      {singleReservationData ? (
        <EditReservationValidation
          carData={carData}
          onSave={onSave}
          citiesData={citiesData}
          customersData={customersData}
          singleReservationData={singleReservationData}
        />
      ) : (
        <ReservationValidation
          carData={carData}
          onSave={onSave}
          citiesData={citiesData}
          customersData={customersData}
        />
      )}
    </>
  );
};

export default ReservationForm;

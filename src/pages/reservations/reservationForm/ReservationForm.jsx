import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ReservationValidation from "../../../validation/reservationValidation/reservationValidation";
import { cityService } from "../../../services/CityService";
import { customerService } from "../../../services/CustomerService";
import { format } from "date-fns";
import { message } from "antd";
import { reservationService } from "../../../services/ReservationService";
import { useTranslation } from "react-i18next";

const ReservationForm = ({ carReservationData, id, close, disabled }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("global");

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
        message.success(t('ant-messages.successAdd'));
        queryClient.invalidateQueries("reservations");
        close();
      })
      .catch((err) => {
        console.log(err);
        message.error(t('ant-messages.error'));
      })
  );

  const edit = useMutation((data) =>
    reservationService
      .edit(data)
      .then((r) => {
        message.success(t('ant-messages.successEdit'));
        queryClient.invalidateQueries("reservations");
        close();
      })
      .catch((err) => {
        console.log(err);
        message.error(t('ant-messages.error'));
      })
  );

  const get = (id) => {
    return reservationService
      .get(id)
      .then((res) => {
        return res;
      })
      .catch((err) => message.error(t('ant-messages.error')));
  };

  const { data: singleReservationData } = useQuery(
    ["reservation-single", id],
    () => get(id),
    {
      enabled: Boolean(id),
    }
  );

  const onSave = (formData) => {
   const saveObject = {
      date_from: format(formData.date_from, "yyyy-MM-dd"),
      date_to: format(formData.date_to, "yyyy-MM-dd"),
      customer_id: formData.customer_id,
      pickup_location: formData.pickup_location,
      drop_off_location: formData.drop_off_location,
      vehicle_id: carReservationData ? carReservationData.id : singleReservationData.vehicleId,
      price: formData.price,
      id: id ? id : null
    };
    if (id) {
      edit.mutate(saveObject);
    } else {
      add.mutate(saveObject);
    }
  };

  return (
    <ReservationValidation
      singleReservationData={singleReservationData}
      onSave={onSave}
      citiesData={citiesData}
      customersData={customersData}
      disabled={disabled}
      carReservationData={carReservationData}
    />
  );
};

export default ReservationForm;

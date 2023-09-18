import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import VehicleValidation from "../../../validation/vehicleValidation/VehicleValidation";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { vehicleService } from "../../../services/VehicleService";

const AddVehicle = ({ id, close }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("global");
  
  const add = useMutation((data) =>
    vehicleService
      .add(data)
      .then((r) => {
        message.success(t('ant-messages.successAdd'));
        queryClient.invalidateQueries("vehicles");
        close();
      })
      .catch((err) => {
        console.log(err?.response.data);
        message.error(t('ant-messages.error'));
      })
  );

  const edit = useMutation((data) =>
    vehicleService
      .edit(data)
      .then((r) => {
        message.success(t('ant-messages.successEdit'));
        queryClient.invalidateQueries("vehicles");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        message.error(t('ant-messages.error'));
      })
  );

  const get = (id) => {
    return vehicleService
      .get(id)
      .then((res) => {
        return res;
      })
      .catch((err) => message.error(t('ant-messages.error')));
  };

  const onSave = (formData) => {
    const editObject = {
      plate_number: formData.plate_number,
      production_year: formData.production_year,
      type: formData.type,
      number_of_seats: formData.number_of_seats,
      daily_rate: formData.daily_rate,
      note: formData.note,
      id: id,
    };
    if (id) {
      edit.mutate(editObject);
    } else {
      add.mutate(formData);
    }
  };

  const { data: singleAddCarData } = useQuery(
    ["vehicle-single", id],
    () => get(id),
    {
      enabled: Boolean(id),
    }
  );

  return (
    <VehicleValidation
      onSave={onSave}
      singleAddCarData={singleAddCarData}
    />
  );
};

export default AddVehicle;

import * as yup from "yup";

import Form from "../../components/form/Form";
import { startOfDay } from "date-fns";

const EditReservationValidation = ({ onSave, disabled, singleReservationData, citiesData }) => {
  const schema = yup.object().shape({
    dateFrom: yup
      .date()
      .required("Field required!")
      .min(startOfDay(new Date()), "Date cannot be in the past"),
    dateTo: yup
      .date()
      .required("Field required!")
     .min(startOfDay(new Date()), "Date cannot be in the past"),
    locationPickup: yup.number().required("Field required!"),
    locationDropoff: yup.number().required("Field required!"),
    priceTotal: yup.number().required("Field required!"),
  });

  const formData = [
    {
        label: "Date from",
        name: "dateFrom",
        type: "date",
      },
      {
        label: "Date to",
        name: "dateTo",
        type: "date",
      },
        {
        label: "Pickup location",
        name: "locationPickup",
        type: "number",
      },
      {
        label: "Drop Off location",
        name: "locationDropoff",
        type: "number",
      },
      {
        label: "Total price",
        name: "priceTotal",
        type: "number",
      },
  ]; 

  return (
    <div>
      <Form
        formData={formData}
        onSubmit={onSave}
        schema={schema}
        disabled={disabled}
        citiesData={citiesData}
        singleReservationData={singleReservationData}
      />
    </div>
  );
};

export default EditReservationValidation;

import * as yup from "yup";

import Form from "../../components/form/Form";
import { startOfDay } from "date-fns";

const ReservationValidation = ({ onSave, customersData, citiesData, carData }) => {
  const schema = yup.object().shape({
    customer: yup.number().required("Field required!"),
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
      label: "Date From",
      name: "dateFrom",
      type: "date",
    },
    {
      label: "Date to",
      name: "dateTo",
      type: "date",
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
        customersData={customersData}
        citiesData={citiesData}
        carData={carData}
      />
    </div>
  );
};

export default ReservationValidation;

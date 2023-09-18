import * as yup from "yup";

import Form from "../../components/formComponents/form/Form";
import { startOfDay } from "date-fns";
import { useTranslation } from "react-i18next";

const ReservationValidation = ({
  onSave,
  customersData,
  citiesData,
  singleReservationData,
  disabled,
  carReservationData,
}) => {
  const { t } = useTranslation("global");
  const schema = yup.object().shape({
    customer_id: yup.number().required(t("validation.required")),
    date_from: yup
      .date()
      .typeError(t("validation.date"))
      .required(t("validation.required"))
      .min(startOfDay(new Date()), t("validation.datePast")),
    date_to: yup
      .date()
      .typeError(t("validation.date"))
      .required(t("validation.required"))
      .min(startOfDay(new Date()), t("validation.datePast")),
    pickup_location: yup.number().required(t("validation.required")),
    drop_off_location: yup.number().required(t("validation.required")),
    price: yup
      .number()
      .required(t("validation.required"))
      .typeError(t("validation.invalidPrice")),
  });

  const formData = [
    {
      label: t("table.customer"),
      name: "customer_id",
      type: "number",
      placeholder: t("table.customerPlaceholder"),
    },
    {
      label: t("table.dateFrom"),
      name: "date_from",
      type: "date",
    },
    {
      label: t("table.dateTo"),
      name: "date_to",
      type: "date",
    },
    {
      label: t("table.pickupLocation"),
      name: "pickup_location",
      type: "number",
      placeholder: t("table.pickupLocationPlaceholder"),
    },
    {
      label: t("table.dropoffLocation"),
      name: "drop_off_location",
      type: "number",
      placeholder: t("table.dropoffLocationPlaceholder"),
    },
    {
      label: t("table.totalPrice"),
      name: "price",
      type: "text",
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
        singleReservationData={singleReservationData}
        disabled={disabled}
        carReservationData={carReservationData}
      />
    </div>
  );
};

export default ReservationValidation;

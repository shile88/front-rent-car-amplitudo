import * as yup from "yup";

import Form from "../../components/formComponents/form/Form";
import { useTranslation } from "react-i18next";

const VehicleValidation = ({ onSave, singleAddCarData }) => {
  const { t } = useTranslation("global");
  const schema = yup.object().shape({
    plate_number: yup
      .string()
      .required(t('validation.required'))
      .matches(
        /^[a-zA-Z0-9]{7}$/,
        t('validation.lettersNumbers7')
      ),
    production_year: yup
      .string()
      .required(t('validation.required'))
      .matches(/^(200[5-9]|20[1-9]|202[3])$/, t('validation.year')),
    type: yup.string().required(t('validation.required')),
    number_of_seats: yup
      .string()
      .required(t('validation.required'))
      .matches(/^(?:[2-9]|10)$/, t('validation.seats')),
    daily_rate: yup
      .string()
      .required(t('validation.required'))
      .matches(/^\d+$/, t('validation.onlyNumbers'))
      .min(1, t('validation.dailyRate')),
    note: yup
      .string()
      .max(15, t('valdation.max15'))
      .required(t('validation.required')),
  });

  const formData = [
    {
      label: t("table.plateNumber"),
      name: "plate_number",
      type: "text",
      placeholder: t("table.plateNumberPlaceholder"),
    },
    {
      label: t("table.productionYear"),
      name: "production_year",
      type: "text",
      placeholder: t("table.productionYearPlaceholder"),
    },
    {
      label: t("table.type"),
      name: "type",
      type: "text",
      placeholder: t("table.typePlaceholder"),
    },
    {
      label: t('table.numberOfSeats'),
      name: "number_of_seats",
      type: "text",
      placeholder: t('table.numberOfSeatsPlaceholder'),
    },
    {
      label: t('table.dailyRate'),
      name: "daily_rate",
      type: "text",
      placeholder: t('table.dailyRatePlaceholder'),
    },
    {
      label: t("table.notes"),
      name: "note",
      type: "text",
      placeholder: t("table.notesPlaceholder"),
    },
  ];

  return (
    <div>
      <Form
        formData={formData}
        onSubmit={onSave}
        schema={schema}
        singleAddCarData={singleAddCarData}
      />
    </div>
  );
};

export default VehicleValidation;

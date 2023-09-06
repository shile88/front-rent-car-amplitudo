import * as yup from "yup";

import Form from "../../components/form/Form";

const VehicleValidation = ({ onSave }) => {
    const schema = yup.object().shape({
        plateNumber: yup
          .string()
          .required("Field required!")
          .length(7, "Field must be exactly 7 characters long!"),
        productionYear: yup
          .string()
          .required("Field required!")
          .length(4, "Field must be exactly 4 characters long!"),
        type: yup.string().required("Field required!"),
        numberOfSeats: yup
          .string()
          .required("Field required!")
          .min(1, "Minimum length is 1"),
        dailyRate: yup
          .string()
          .required("Field required!")
          .min(1, "Minimum length is 9!"),
        note: yup.string().max(15, "Maximum length is 15!"),
      });

  const formData = [
    {
      label: "Plate Number",
      name: "plateNumber",
      type: "text",
    },
    {
      label: "Production Year",
      name: "productionYear",
      type: "text",
    },
    {
      label: "Type",
      name: "type",
      type: "text",
    },
    {
      label: "Number of seats",
      name: "numberOfSeats",
      type: "text",
    },
    {
      label: "Daily Rate",
      name: "dailyRate",
      type: "text",
    },
    {
      label: "Note",
      name: "note",
      type: "text",
    },
  ];

  return (
    <div>
      <Form formData={formData} onSubmit={onSave} schema={schema}/>
    </div>
  );
};

export default VehicleValidation;
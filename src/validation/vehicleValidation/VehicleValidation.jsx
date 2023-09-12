import * as yup from "yup";

import Form from "../../components/form/Form";

const VehicleValidation = ({ onSave, singleCarData }) => {
    const schema = yup.object().shape({
        plateNumber: yup
          .string()
          .required("Field required!")
          .matches(/^[a-zA-Z0-9]{7}$/, 'Input must be 7 characters long and contain only numbers and letters'),
        productionYear: yup
          .string()
          .required("Field required!")
          .matches(/^\d{4}$/, 'Input must be exactly 4 digits'),
        type: yup.string().required("Field required!"),
        numberOfSeats: yup
          .string()
          .required("Field required!")
          .matches(/^\d+$/, 'Input can only contain numbers')
          .min(2, 'Number of seats must be at least 2'),
        dailyRate: yup
          .string()
          .required("Field required!")
          .matches(/^\d+$/, 'Input can only contain numbers')
          .min(1, 'Daily rate must be at least 1'),
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
      <Form formData={formData} onSubmit={onSave} schema={schema} singleCarData={singleCarData}/>
    </div>
  );
};

export default VehicleValidation;
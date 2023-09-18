import PageContent from "../../../components/pageContent/PageContent";
import ReservationForm from "../reservationForm/ReservationForm";
import { useModal } from "../../../context/ModalContext";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { vehicleService } from "../../../services/VehicleService";

const AddReservation = () => {
  const { open, close } = useModal();
  const { t } = useTranslation("global");
  const { data } = useQuery(
    ["vehicles"],
    () => vehicleService.getAll(),
    {
      enabled: true,
      initialData: [],
    }
  );

  const header = [
    {
      title: t("table.plateNumber"),
      index: "plate_number",
    },
    {
      title:  t("table.productionYear"),
      index: "production_year",
    },
    {
      title: t('table.numberOfSeats'),
      index: "number_of_seats",
    },
    {
      title:  t('table.dailyRate'),
      index: "daily_rate",
    },
  ];

  const closeForm = () => {
    close();
  };

  const openForm = (record, disabled) => {
    open(
      t('modal.addReservationTitle'),
      <ReservationForm carReservationData={record} close={closeForm} disabled={disabled}/>
    );
  };

  return (
    <PageContent
      title={t('main.rentVehicle')}
      header={header}
      data={data}
      onRow={(record) => {
        return {
          onClick: () => {
            openForm(record, false);
          },
        };
      }}
    />
  );
};

export default AddReservation;

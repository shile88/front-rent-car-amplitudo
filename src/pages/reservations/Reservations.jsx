import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "../../components/buttons/button/Button";
import PageContent from "../../components/pageContent/PageContent";
import ReservationForm from "./reservationForm/ReservationForm";
import classes from "./Reservations.module.scss";
import { message } from "antd";
import { reservationService } from "../../services/ReservationService";
import { useModal } from "../../context/ModalContext";
import { useTranslation } from "react-i18next";

const Reservations = () => {
  const queryClient = useQueryClient();
  const { open, close } = useModal();
  const [query, setQuery] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [datePicker, setDatePicker] = useState([]);
  const { t } = useTranslation("global");

  const dateFromParams = searchParams.get("dateFrom");
  const dateToParams = searchParams.get("dateTo");

  const { data } = useQuery(
    ["reservations", query],
    () => reservationService.getAll(query),
    {
      enabled: true,
      initialData: [],
    }
  );
  
  useEffect(() => {
   if(dateFromParams !== null || dateToParams !== null)
    setQuery({ dateFrom: dateFromParams, dateTo: dateToParams });
 
  }, [dateFromParams, dateToParams]);

  const deleteReservation = useMutation((data) =>
    reservationService
      .delete(data)
      .then((r) => {
        message.success(t('ant-messages.successDeleted'));
        queryClient.invalidateQueries("reservations");
        close();
      })
      .catch((err) => {
        console.log(err);
        message.error(t('ant-messages.error'));
      })
  );

  const onDelete = (id) => {
    deleteReservation.mutate(id);
  };

  const header = [
    {
      title: t("table.firstName"),
      index: "first_name",
    },
    {
      title: t("table.lastName"),
      index: "last_lame",
    },
    {
      title: t("table.plateNumber"),
      index: "plate_number",
    },
    {
      title:t('table.dateFrom'),
      index: "date_from",
    },
    {
      title: t('table.dateTo'),
      index: "date_to",
    },
    {
      title: t('table.pickupLocation'),
      index: "pickup_location",
    },
    {
      title: t("table.dropoffLocation"),
      index: "drop_off_location",
    },
    {
      title: t('table.totalPrice'),
      index: "price",
    },
    {
      title:t("table.actions"),
      index: null,
      render: (data) => {
        return (
          <div className={classes["action-buttons"]}>
            <Button label={t('buttons.edit')} onClick={() => openForm(data?.id, false)} />
            <Button
              label={t('buttons.delete')}
              onClick={() => openForm(data?.id, false, true)}
            />
          </div>
        );
      },
    },
  ];

  const closeForm = () => {
    close();
  };

  const openForm = (id, disabled, openDeleteModal) => {
    openDeleteModal
      ? open(
        t('modal.delete'),
          <div>
            <button onClick={() => onDelete(id)}>{t('modal.buttonYes')}</button>
            <button onClick={() => closeForm()}>{t('modal.buttonNo')}</button>
          </div>
        )
      : open(
          disabled ? t('modal.showReservationTitle') : t('modal.editReservationTitle'),
          <ReservationForm
            key={`reservation-${id}`}
            id={id}
            close={closeForm}
            disabled={disabled}
          />
        );
  };

  const dateSearch = (dates, dateStrings) => { 
    const dateFrom = dateStrings[0];
    const dateTo = dateStrings[1];

    setDatePicker(dateStrings);
    navigate(`/reservations?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  };

  return (
    <PageContent
      title={t('main.reservationsTitle')}
      placeholder="Insert first name or email for search"
      onClick={() => navigate("/reservations/add")}
      dateSearch={dateSearch}
      header={header}
      data={data}
      onRow={(record) => {
        return {
          onClick: (e) => {
            if (e.target.cellIndex !== undefined) openForm(record?.id, true);
          },
        };
      }}
    />
  );
};

export default Reservations;

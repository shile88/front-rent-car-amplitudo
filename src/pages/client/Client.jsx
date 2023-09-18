import { format, startOfDay } from "date-fns";

import Button from "../../components/buttons/button/Button";
import ReservationCard from "./reservationCard/ReservationCard";
import classes from "./Client.module.scss";
import { reservationService } from "../../services/ReservationService";
import { useModal } from "../../context/ModalContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Client = () => {
  const [query, setQuery] = useState("");
  const { open, close } = useModal();
  const currentDate = startOfDay(new Date());
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const { t } = useTranslation("global");
  const [resStatus, setResStatus] = useState("");

  const { data } = useQuery(
    ["reservations", query],
    () => reservationService.getAll(query),
    {
      enabled: true,
      initialData: [],
    }
  );

  const filteredData = data.filter((item) => {
    if (resStatus === "prevRes") {
      return item.date_to < formattedDate;
    }
    if (resStatus === "futureRes") {
      return item.date_from > formattedDate;
    }
    if (resStatus === "currRes") {
      return formattedDate > item.date_from && formattedDate < item.date_to;
    }
    if (resStatus === "allRes" || resStatus === "") return true;
  });

  const closeForm = () => {
    close();
  };

  const openForm = (item) => {
    open(
      t("modal.showReservationTitle"),
      <ReservationCard item={item} close={closeForm} details />
    );
  };

  return (
    <div className={classes["client-wrapper"]}>
      <div className={classes["filter-buttons"]}>
        <Button
          onClick={() => setResStatus("prevRes")}
          label={t("client.prevRes")}
        />

        <Button
          onClick={() => setResStatus("currRes")}
          label={t("client.currRes")}
        />

        <Button
          onClick={() => setResStatus("futureRes")}
          label={t("client.futureRes")}
        />

        <Button
          onClick={() => setResStatus("allRes")}
          label={t("client.allRes")}
        />
      </div>
      <div className={classes.reservations}>
        {filteredData
          .slice() // Create a shallow copy of the data array
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // Sort by date_from property
          .map((item) => {
            const date = new Date(item.created_at);
            const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
            return (
              <ReservationCard
                key={item.id}
                reservedAt={formattedDate}
                plateNumber={item.plate_number}
                price={item.daily_rate}
                dateFrom={item.date_from}
                dateTo={item.date_to}
                details={false}
                onClick={() => openForm(item)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Client;

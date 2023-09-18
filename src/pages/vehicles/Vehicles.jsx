import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import AddVehicle from "./addEditVehicle/AddEditVehicle";
import Button from "../../components/buttons/button/Button";
import PageContent from "../../components/pageContent/PageContent";
import { message } from "antd";
import { useModal } from "../../context/ModalContext";
import { useTranslation } from "react-i18next";
import { vehicleService } from "../../services/VehicleService";

const Vehicles = () => {
  const { t } = useTranslation("global");
  const queryClient = useQueryClient();
  const { open, close } = useModal();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  
 

  useEffect(() => {
    setQuery(search)
  }, [search])

  const { data } = useQuery(
    ["vehicles", query],
    () => vehicleService.getAll(query),
    {
      enabled: true,
      initialData: [],
    }
  );

  const deleteVehicle = useMutation((data) =>
    vehicleService
      .delete(data)
      .then((r) => {
        message.success(t('ant-messages.successDeleted'));
        queryClient.invalidateQueries("vehicles");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        message.error(t('ant-messages.error'));
      })
  );

  const onDelete = (id) => {
    deleteVehicle.mutate(id);
  };

  const header = [
    {
      title: t("table.plateNumber"),
      index: "plate_number",
    },
    {
      title: t("table.productionYear"),
      index: "production_year",
    },
    {
      title: t("table.type"),
      index: "type",
    },
    {
      title: t('table.numberOfSeats'),
      index: "number_of_seats",
    },
    {
      title: t('table.dailyRate'),
      index: "daily_rate",
    },
    {
      title:  t("table.notes"),
      index: "note",
    },
    {
      title: t("table.actions"),
      index: null,
      render: (data) => {
        return (
          <div>
            <Button label={t('buttons.edit')} onClick={() => openForm(data?.id)} />
            <Button label={t('buttons.delete')} onClick={() => openForm(data?.id, true)} />
          </div>
        );
      },
    },
  ];

  const closeForm = () => {
    close();
  };

  const openForm = (id, openDeleteModal) => {
    openDeleteModal
      ? open(
        t('modal.delete'),
          <div>
            <button onClick={() => onDelete(id)}>{t('modal.buttonYes')}</button>
            <button onClick={() => closeForm()}>{t('modal.buttonNo')}</button>
          </div>
        )
      : open(
          id ? t('modal.editVehicleTitle') : t('modal.addVehicleTitle'),
          <AddVehicle key={`vehicle-${id}`} id={id} close={closeForm} />
        );
  };

  return (
    <PageContent
      title={t('main.vehiclesTitle')}
      placeholder={t('search.vehiclesSearch')}
      onChange={(e)=>navigate(`/vehicles?search=${e.target.value}`)}
      onClick={() => openForm(null)}
      header={header}
      data={data}
    />
  );
};

export default Vehicles;

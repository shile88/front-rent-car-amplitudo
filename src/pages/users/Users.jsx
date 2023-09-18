import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import AddCustomer from "./addCustomer/AddCustomer";
import Button from "../../components/buttons/button/Button";
import PageContent from "../../components/pageContent/PageContent";
import { customerService } from "../../services/CustomerService";
import { message } from "antd";
import { useModal } from "../../context/ModalContext";
import { useTranslation } from "react-i18next";

const Users = () => {
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
    ["customers", query],
    () => customerService.getAll(query),
    {
      enabled: true,
      initialData: [],
    }
  );

  const deleteCustomer = useMutation((data) =>
    customerService
      .delete(data)
      .then((r) => {
        message.success(t('ant-messages.successDeleted'));
        queryClient.invalidateQueries("customers");
        close();
      })
      .catch((err) => {
        console.log(err?.response.data);
        message.error(t('ant-messages.error'));
      })
  );

  const onDelete = (id) => {
    deleteCustomer.mutate(id);
  };

  const header = [
    {
      title: t("table.firstName"),
      index: "first_name",
    },
    {
      title: t("table.lastName"),
      index: "last_name",
    },
    {
      title: "Email",
      index: "email",
    },
    {
      title: t("table.passportNo"),
      index: "passport_number",
    },
    {
      title: t("table.phoneNo"),
      index: "phone_number",
    },
    {
      title: t("table.notes"),
      index: "note",
    },
    {
      title: t("table.actions"),
      index: null,
      render: (data) => {
        return (
          <div>
            <Button label={t('buttons.edit')} onClick={() => openForm(data?.id)} />
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
    let title = t('modal.addCustomerTitle');
    if (disabled) title = t('modal.showCustomerTitle');
    if (id && !disabled) title = t('modal.editCustomerTitle');
    openDeleteModal
      ? open(
          t('modal.delete'),
          <div>
            <button onClick={() => onDelete(id)}>{t('modal.buttonYes')}</button>
            <button onClick={() => closeForm()}>{t('modal.buttonNo')}</button>
          </div>
        )
      : open(
          title,
          <AddCustomer
            key={`customer-${id}`}
            id={id}
            close={closeForm}
            disabled={disabled}
          />
        );
  };

  return (
    <PageContent
      title={t('main.customersTitle')}
      placeholder={t('search.customerSearch')}
      onChange={(e)=>navigate(`/users?search=${e.target.value}`)}
      onClick={() => openForm(null)}
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

export default Users;

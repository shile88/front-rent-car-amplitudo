import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AddCustomer from "./addCustomer/AddCustomer";
import Button from "../../components/buttons/button/Button";
import PageContent from "../../components/pageContent/PageContent";
import { customerService } from "../../services/CustomerService";
import { message } from "antd";
import { useModal } from "../../context/ModalContex";
import { useState } from "react";

const Users = () => {
  const queryClient = useQueryClient();
  const { open, close } = useModal();
  const [query, setQuery] = useState("");

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
        message.success("Succesfully deleted!");
        queryClient.invalidateQueries("customers");
        close();
      })
      .catch((err) => {
        console.log(err);
        message.error("There has been an error!");
      })
  );

  const onDelete = (id) => {
    deleteCustomer.mutate(id);
  };

  const header = [
    {
      title: "First Name",
      index: "firstName",
    },
    {
      title: "Last Name",
      index: "lastName",
    },
    {
      title: "Email",
      index: "email",
    },
    {
      title: "Passport number",
      index: "passportNumber",
    },
    {
      title: "Phone number",
      index: "phoneNumber",
    },
    {
      title: "Notes",
      index: "note",
    },
    {
      title: "Actions",
      index: null,
      render: (data) => {
        return (
          <div>
            <Button label={"Edit"} onClick={() => openForm(data?.id)} />
            <Button label={"Delete"} onClick={() => onDelete(data?.id)} />
          </div>
        );
      },
    },
  ];

  const closeForm = () => {
    close();
  };

  const openForm = (id, disabled) => {
    open(
      disabled ? 'Customer details' : "Edit Customer",
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
      title="Customers"
      placeholder="Insert first name or email for search"
      onChange={(e) => setQuery(e.target.value)}
      onClick={() => openForm(null)}
      header={header}
      data={data.filter(
        (item) =>
          item.firstName.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase())
      )}
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

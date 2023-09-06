import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AddButton from "../../components/buttons/addButton/AddButton";
import AddCustomer from "./addCustomer/AddCustomer";
import Button from "../../components/buttons/button/Button";
import SearchField from "../../components/search/Search";
import Table from "../../components/table/Table";
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
        queryClient.invalidateQueries("customer-single");
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data);
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

  const openForm = (id) => {
    open(
      "Customer",
      <AddCustomer key={`customer-${id}`} id={id} close={closeForm} />
    );
  };

  return (
    <div>
      <h1>Customers</h1>
      <div>
        <SearchField
          placeholder={"Insert first name or email for search"}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <AddButton onClick={() => openForm(null)} />

      <div>
        <Table
          header={header}
          data={data.filter(
            (item) =>
              item.firstName.toLowerCase().includes(query.toLowerCase()) ||
              item.email.toLowerCase().includes(query.toLowerCase())
          )}
        />
      </div>
    </div>
  );
};

export default Users;

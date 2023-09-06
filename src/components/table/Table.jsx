import { Table as AntdTable } from "antd";

const Table = ({ header, data, onRow }) => {

  return (
    <AntdTable
      columns={header.map((item) => ({ ...item, dataIndex: item.index }))}
      dataSource={data}
      onRow={onRow}
    />
  );
};

export default Table;

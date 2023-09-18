import "./Table.scss";

import { Table as AntdTable } from "antd";

const Table = ({ header, data, onRow }) => {
  return (
    <AntdTable
      columns={header.map((item) => ({ ...item, dataIndex: item.index }))}
      dataSource={data}
      onRow={onRow}
      className="table"
      pagination={{
        pageSize: 5,
      }}
      scroll={{x:true}}
    />
  );
};

export default Table;

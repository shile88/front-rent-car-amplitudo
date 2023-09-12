import AddButton from "../buttons/addButton/AddButton";
import AppRoutes from "../appRoutes";
import SearchField from "../search/Search";
import Table from "../table/Table";
import classes from "./PageContent.module.scss";

const PageContent = ({
  title,
  placeholder,
  onChange,
  header,
  onClick,
  data,
  onRow
}) => {
  return (
    <div className={classes["page-content-wrapper"]}>
      {title && <h1>{title}</h1>}
      {placeholder && (
        <div className={classes.search}>
          <SearchField placeholder={placeholder} onChange={onChange} />
        </div>
      )}

      {onClick && (
        <div className={classes["add-btn"]}>
          <AddButton onClick={onClick} />
        </div>
      )}

      {header && (
        <div className={classes.table}>
          <Table header={header} data={data} onRow={onRow}/>
        </div>
      )}
    </div>
  );
};

export default PageContent;

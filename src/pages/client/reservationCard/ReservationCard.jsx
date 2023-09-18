import "./ReservationCard.scss";

import { useTranslation } from "react-i18next";

const ReservationCard = ({
  price,
  plateNumber,
  reservedAt,
  dateFrom,
  dateTo,
  onClick,
  details,
  item,
}) => {
  const { t } = useTranslation("global");
  return (
    <div className="card-wrapper" onClick={onClick}>
      <div className="card-price">
        <span>{details ? item.daily_rate : price}€</span> / {t('table.rentDay')}
      </div>
      <div className="card-table">
        <div className="card-table-col">
          <span>{t('table.createDate')}:</span>
          <span> {details ? item?.created_at : reservedAt}</span>
        </div>
        {details && (
          <div className="card-table-col">
            <span>{t('table.name')}:</span>
            <span>
              {item.first_name} {item.last_name}
            </span>
          </div>
        )}
        <div className="card-table-col">
          <span>{t('table.plateNumber')}:</span>
          <span>{details ? item.plate_number : plateNumber}</span>
        </div>
        <div className="card-table-col">
          <span>{t('table.dateFrom')}:</span>
          <span> {details ? item.date_from : dateFrom}</span>
        </div>
        <div className="card-table-col">
          <span>{t('table.dateTo')}:</span>
          <span>{details ? item.date_to : dateTo}</span>
        </div>
        {details && (
          <div className="card-table-col">
            <span>{t('table.pickupLocation')}:</span>
            <span>{item.pickup_location}</span>
          </div>
        )}
        {details && (
          <div className="card-table-col">
            <span>{t('table.dropoffLocation')}:</span>
            <span>{item.drop_off_location}</span>
          </div>
        )}
        {details && (
          <div className="card-table-col">
            <span>{t('table.totalPrice')}:</span>
            <span>{item.price}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;

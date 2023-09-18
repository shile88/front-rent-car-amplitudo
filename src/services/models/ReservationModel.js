class ReservationModel {
    constructor(responseData) {
        this.id = responseData?.id;
        this.first_name = responseData?.customer.first_name;
        this.last_name = responseData?.customer.last_name;
        this.plate_number = responseData?.vehicle.plate_number;
        this.daily_rate = responseData?.vehicle.daily_rate;
        this.date_from = responseData?.date_from;
        this.date_to = responseData?.date_to;
        this.pickup_location = responseData?.pickup_location.name;
        this.pickup_location_id = responseData?.pickup_location.id;
        this.key = responseData?.id;
        this.drop_off_location = responseData?.drop_off_location.name;
        this.drop_off_location_id = responseData?.drop_off_location.id;
        this.price = responseData?.price;
        this.vehicle_id = responseData?.vehicle.id;
        this.created_at = responseData?.created_at;
        this.customer_id = responseData?.customer.id;
    }
}

export default ReservationModel;
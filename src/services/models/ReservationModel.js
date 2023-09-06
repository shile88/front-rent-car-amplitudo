class ReservationModel {
    constructor(responseData) {
        this.id = responseData?.id;
        this.firstName = responseData?.customer.first_name;
        this.lastName = responseData?.customer.last_name;
        this.plateNumber = responseData?.vehicle.plate_number;
        this.dateFrom = responseData?.date_from;
        this.dateTo = responseData?.date_to;
        this.locationPickup = responseData?.pickup_location.name;
        this.key = responseData?.id;
        this.locationDropoff = responseData?.drop_off_location.name;
        this.priceTotal = responseData?.price;
    }
}

export default ReservationModel;
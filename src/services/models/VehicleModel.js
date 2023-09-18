class VehicleModel {
    constructor(responseData) {
        this.id = responseData?.id;
        this.plate_number = responseData?.plate_number;
        this.production_year = responseData?.production_year;
        this.type = responseData?.type;
        this.number_of_seats = responseData?.number_of_seats;
        this.daily_rate = responseData?.daily_rate;
        this.note = responseData?.note;
        this.key = responseData?.id;
    }
}

export default VehicleModel;
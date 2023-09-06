class VehicleModel {
    constructor(responseData) {
        this.id = responseData?.id;
        this.plateNumber = responseData?.plate_number;
        this.productionYear = responseData?.production_year;
        this.type = responseData?.type;
        this.numberOfSeats = responseData?.number_of_seats;
        this.dailyRate = responseData?.daily_rate;
        this.note = responseData?.note;
        this.key = responseData?.id;
    }
}

export default VehicleModel;
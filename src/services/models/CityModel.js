class CityModel {
    constructor(responseData) {
        this.id = responseData?.id;
        this.name = responseData?.name;
    }
}

export default CityModel;
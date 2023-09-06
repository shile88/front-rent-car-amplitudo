class CountryModel {
    constructor(responseData) {
        this.id = responseData?.id;
        this.name = responseData?.name;
    }
}

export default CountryModel;
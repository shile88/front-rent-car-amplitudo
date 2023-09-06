class CustomerModel {
    constructor(responseData) {
        this.id = responseData?.id;
        this.firstName = responseData?.first_name;
        this.lastName = responseData?.last_name;
        this.email = responseData?.email;
        this.passportNumber = responseData?.passport_number;
        this.phoneNumber = responseData?.phone_number;
        this.note = responseData?.note;
        this.key = responseData?.id;
        this.country = responseData?.country_id ? responseData?.country_id : {id: responseData?.country?.id, name: responseData?.country?.name}
        this.role = responseData?.role_id ? responseData?.role_id : {id: responseData?.role?.id, name: responseData?.role?.name}
    }
}

export default CustomerModel;
class CustomerModel {
    constructor(responseData) {
        this.id = responseData?.id;
        this.first_name = responseData?.first_name;
        this.last_name = responseData?.last_name;
        this.email = responseData?.email;
        this.passport_number = responseData?.passport_number;
        this.phone_number = responseData?.phone_number;
        this.note = responseData?.note;
        this.key = responseData?.id;
        this.country_id = responseData?.country_id 
        this.country_name = responseData?.country_name
        this.role_id = responseData?.role_id 
        this.role_name = responseData?.role_name
    }
}

export default CustomerModel;
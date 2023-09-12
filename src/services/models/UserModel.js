class UserModel {
    constructor(responseData) {
        this.id = responseData?.data.id;
        this.firstName = responseData?.data.first_name;
        this.lastName = responseData?.data.last_name;
        this.role = responseData?.data.role_id;
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}

export default UserModel;
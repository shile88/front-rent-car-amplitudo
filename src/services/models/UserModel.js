class UserModel {
    constructor(responseData) {
        this.id = responseData?.data.id;
        this.first_name = responseData?.data.first_name;
        this.last_name = responseData?.data.last_name;
        this.role_id = responseData?.data.role_id;
    }

    getFullName(){
        return `${this.first_name} ${this.last_name}`
    }
}

export default UserModel;
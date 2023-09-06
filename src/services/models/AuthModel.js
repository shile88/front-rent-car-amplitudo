class AuthModel {
    constructor(responseData) {
        this.access_token = responseData?.data.access_token;
    }

    getToken(){
        return this.access_token;
    }
}

export default AuthModel;
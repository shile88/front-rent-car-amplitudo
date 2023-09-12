import UserModel from "./models/UserModel";
import {requestInstance} from "../config/requestInstance";

class UserService {
    //apis used for user requests
    api = {
        account: '/account',
    }

    //parameters used in apis
    params = {}

    getCurrentUserData(){
        return requestInstance.get(this.api.account)
            .then(r => {
                return new UserModel(r)
            })
            .catch(err => Promise.reject(err))
    }

}

export const userService = new UserService();
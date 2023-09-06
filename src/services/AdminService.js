import AdminModel from "./models/AdminModel";
import {requestInstance} from "../config/requestInstance";

class AdminService {
    //apis used for user requests
    api = {
        account: '/account',
    }

    //parameters used in apis
    params = {}

    getCurrentAdminData(){
        return requestInstance.get(this.api.account)
            .then(r => {
                return new AdminModel(r)
            })
            .catch(err => Promise.reject(err))
    }

}

export const adminService = new AdminService();
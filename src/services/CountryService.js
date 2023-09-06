import CountryModel from "./models/CountryModel";
import {requestInstance} from "../config/requestInstance";

class CountryService {
    //apis used for user requests
    api = {
        account: '/countries',
    }

    //parameters used in apis
    params = {}

    getCountriesData(){
        return requestInstance.get(this.api.account)
        .then(r => r?.data.data.map(item => new CountryModel(item)))
        .catch(err => Promise.reject(err))
    }

}

export const countryService = new CountryService();
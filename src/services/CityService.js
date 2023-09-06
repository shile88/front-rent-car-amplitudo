import CityModel from "./models/CityModel";
import {requestInstance} from "../config/requestInstance";

class CityService {
    //apis used for user requests
    api = {
        city: '/cities',
    }

    //parameters used in apis
    params = {}

    getCitiesData(){
        return requestInstance.get(this.api.city)
        .then(r => r?.data.data.map(item => new CityModel(item)))
        .catch(err => Promise.reject(err))
    }

}

export const cityService = new CityService();
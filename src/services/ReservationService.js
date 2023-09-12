import ReservationModel from "./models/ReservationModel";
import {requestInstance} from "../config/requestInstance";

class ReservationService {
    //apis used for task categories requests
    api = {
        main: '/reservations', //main api
    }

    //parameters used in apis
    params = {
        dateFrom: "date_from=",
        dateTo: "date_to="
    }

    //this returns list of categories
    //optional - send query for search
    getAll(query){
        // if search query is passed to method, add it to api
        const queryFirstParam = query?.length > 0 ? `?${this.params.dateFrom}${query.dateFrom}` : '';
        const querySecondParam = query?.length > 0 ? `?${this.params.dateTo}${query.dateTo}` : '';
        return requestInstance.get(`${this.api.main}${queryFirstParam}${querySecondParam}`)
            .then(r => r?.data.data.map(item => new ReservationModel(item)))
            .catch(err => Promise.reject(err))
    }

    //this returns single category
   get(id){
        return requestInstance.get(`${this.api.main}/${id}`)
            .then(r => new ReservationModel(r.data.data))
            .catch(err => Promise.reject(err))
    }

    add(data){
        const formData = {...data};
        return requestInstance.post(this.api.main, formData)
            .then(r => new ReservationModel(r.data.data))
            .catch(err => Promise.reject(err))
    }

    edit(data){
        const formData = {...data};
        return requestInstance.put(`${this.api.main}/${data?.id}`, formData)
            .then(r => new ReservationModel(r.data))
            .catch(err => Promise.reject(err))
    }

    delete(id){
        return requestInstance.delete(`${this.api.main}/${id}`)
            .then(r => new ReservationModel(r.data.data))
            .catch(err => Promise.reject(err))
    }


}

export const reservationService = new ReservationService();
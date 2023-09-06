import CustomerModel from "./models/CustomerModel";
import {requestInstance} from "../config/requestInstance";

class CustomerService {
    //apis used for task categories requests
    api = {
        main: '/customers', //main api
        crud: '/users'// example get /categories
    }

    //parameters used in apis
    params = {
        search: "search="
    }

    //this returns list of categories
    //optional - send query for search
    getAll(query){
        // if search query is passed to method, add it to api
        const queryParam = query?.length > 0 ? `?${this.params.search}${query}` : '';
        return requestInstance.get(`${this.api.main}${queryParam}`)
            .then(r => r?.data.data.map(item => new CustomerModel(item)))
            .catch(err => Promise.reject(err))
    }

    //this returns single category
   get(id){
        return requestInstance.get(`${this.api.crud}/${id}`)
            .then(r => new CustomerModel(r.data))
            .catch(err => Promise.reject(err))
    }

    add(data){
        const formData = {...data};
        return requestInstance.post(this.api.crud, formData)
            .then(r => new CustomerModel(r.data))
            .catch(err => Promise.reject(err))
    }

    edit(data){
        const formData = {...data};
        return requestInstance.put(`${this.api.crud}/${data?.id}`, formData)
            .then(r => new CustomerModel(r.data))
            .catch(err => Promise.reject(err))
    }

    delete(id){
        return requestInstance.delete(`${this.api.crud}/${id}`)
            .then(r => new CustomerModel(r.data))
            .catch(err => Promise.reject(err))
    }


}

export const customerService = new CustomerService();
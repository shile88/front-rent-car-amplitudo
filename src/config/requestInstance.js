import axios from "axios";
import {storageKeys} from "./config";
import {storageService} from "../services/StorageService";

export const requestInstance = axios.create();

requestInstance.defaults.baseURL = 'https://rentacarapi.amplitudo.me/api' //backend app url;
requestInstance.defaults.headers['Accept'] = "application/json";

requestInstance.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = storageService.exists(storageKeys.USER) ?
            `Bearer ${storageService.get(storageKeys.USER)}`
            : 'undefined';
        return config;
    },
    (error) => {
        Promise.reject(error)
    }
)
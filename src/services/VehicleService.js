import VehicleModel from "./models/VehicleModel";
import { requestInstance } from "../config/requestInstance";

class VehicleService {
  //apis used for task categories requests
  api = {
    main: "/vehicles", //main api
    // example get /categories
  };

  //parameters used in apis
  params = {
    search: "search=",
  };

  //this returns list of categories
  //optional - send query for search
  getAll(query) {
    // if search query is passed to method, add it to api
    const queryParam =
      query?.length > 0 ? `?${this.params.search}${query}` : "";
    return requestInstance
      .get(`${this.api.main}${queryParam}`)
      .then((r) =>
        query
          ? r?.data.data.map((item) => new VehicleModel(item))
          : r?.data?.map((item) => new VehicleModel(item))
      )
      .catch((err) => Promise.reject(err));
  }

  //this returns single category
  get(id) {
    return requestInstance
      .get(`${this.api.main}/${id}`)
      .then((r) => new VehicleModel(r.data.data))
      .catch((err) => Promise.reject(err));
  }

  add(data) {
    const formData = { ...data };
    return requestInstance
      .post(this.api.main, formData)
      .then((r) => new VehicleModel(r.data))
      .catch((err) => Promise.reject(err));
  }

  edit(data) {
    const formData = { ...data };
    return requestInstance
      .put(`${this.api.main}/${data?.id}`, formData)
      .then((r) => new VehicleModel(r.data))
      .catch((err) => Promise.reject(err));
  }

  delete(id) {
    return requestInstance
      .delete(`${this.api.main}/${id}`)
      .then((r) => new VehicleModel(r?.data))
      .catch((err) => Promise.reject(err));
  }
}

export const vehicleService = new VehicleService();

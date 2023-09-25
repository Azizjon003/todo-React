import axios from "axios";
const BaseUrl = "http://localhost:3000/";
export const ApiService = {
  async getData(url) {
    const data = await axios.get(`${BaseUrl}${url}`);
    return data;
  },
  async createData(url, data) {
    const datacha = await axios.post(`${BaseUrl}/${url}`, data);
    return datacha;
  },
  async deletedData(url, id) {
    const data = await axios.delete(`${BaseUrl}/${url}/${id}`);
    return data;
  },
  async updateData(url, id, data) {
    const datacha = await axios.put(`${BaseUrl}/${url}/${id}`, data);
    return datacha;
  },
};

import axios from 'axios';

export const backendUrl = 'http://localhost:5000';

class ApiService {
  httpGET(url, headers = {}) {
    return axios.get(backendUrl + url, this.authorize())
      .then(this.mapResponse);
  }

  httpPOST(url, data = {}, headers = {}) {
    return axios.post(backendUrl + url, data, this.authorize())
      .then(this.mapResponse);
  }

  httpDELETE(url, headers = {}) {
    return axios.delete(backendUrl + url, this.authorize())
      .then(this.mapResponse);
  }

  httpPUT(url, data = {}, headers = {}) {
    return axios.put(backendUrl + url, data, this.authorize())
      .then(this.mapResponse);
  }

  mapResponse = (response) => {
    return response.data;
  };

  authorize = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return { headers: { 'Authorization': 'Bearer ' + token } };
    }
    return null;
  }

}

const api = new ApiService();
export default api;
import axios from "axios";

const API_URL = "http://localhost:3030/api/";

class DBService {
    getAllData() {
        return axios
        .post(API_URL + "alldata")
        .then(response => {
            return response.data;
        });
    }

    getDataByType(type) {
        return axios
        .post(API_URL + "data", {
            type
        })
        .then(response => {
            return response.data;
        });
    }

    getSearchData(type, title) {
        return axios
        .post(API_URL + "searchdata", {
            type,
            title
        })
        .then(response => {
            return response.data;
        });
    }

    getMovieInformation(id, type) {
        return axios
        .post(API_URL + "infodata", {
            type,
            id
        })
        .then(response => {
            return response.data;
        });
    }
}

export default new DBService();
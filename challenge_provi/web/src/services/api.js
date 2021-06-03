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

    login(username, password, remember) {
        return axios
          .post(API_URL + "auth/signin", {
            username,
            password
          })
          .then(response => {
            if (response.data.accessToken) {
              if(remember)
                localStorage.setItem("user", JSON.stringify(response.data));
              sessionStorage.setItem("user", JSON.stringify(response.data));
            }
            
            document.cookie = "accessToken = "+response.data.accessToken;
            localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
    
            return response.data;
          });
      }
    
      register(username, email, password, city, isAdmin){
        let roles;
        if (isAdmin)
          roles = ['user', 'admin'];
        else
          roles = ['user'];
        
        return axios
          .post(API_URL + "auth/signup", {
            username,
            email,
            password,
            city,
            roles
          })
          .then(response => {
            return response.data.message;
          }).catch(error => {
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            return resMessage;
          });
      }
    
      logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
        document.cookie = 'accessToken=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      }
    
      tokenAutentication(token){
        return axios
          .get(API_URL + "test/user", { 'headers': { 'x-access-token': token } })
          .then(response => {
            return response;
          }).catch(error => {
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            return resMessage;
          });
      }
    
      exchangeToken(token, username){
        const headers = {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
        return axios
          .post(API_URL + "auth/exchangetoken", {username}, {headers})
          .then(response => {
            return response;
          }).catch(error => {
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            return resMessage;
          });
      }
    
      getCurrentUser(){ 
        let user = JSON.parse(sessionStorage.getItem('user'));
        if(!user)
          user = JSON.parse(localStorage.getItem('user'));
        return user;
      
      }
}

export default new DBService();
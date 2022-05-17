
import axios from 'axios';


class AxiosService {
    constructor() {
        const instance = axios.create();
        instance.interceptors.response.use(this.handleSuccess, this.handleError);

        instance.interceptors.request.use(
            (config) => {
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
        );
        this.instance = instance;

    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject((error.response && error.response.data) || 'Something went wrong'); 
    }

    get(url, params) {
        return this.instance.get(url,params);
    }

    post(url, body, config) {
        return this.instance.post(url, body, config);
    }
    
    put(url, body) {
        return this.instance.put(url, body);
    }
    
    delete(url) {
        return this.instance.delete(url);
    }
}


export default new AxiosService();
import Axios, { AxiosInstance, Method} from "axios";

class ApiService {
    apiServiceInstance: AxiosInstance;
    constructor(){
        this.apiServiceInstance = Axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com/'
        })
    }

    /* eslint-disable @typescript-eslint/no-explicit-any*/
    sendGetRequest(url: string, parameters: any): Promise<any> {
        return this.sendHttpRequest("GET", url, parameters);
    }

    sendHttpRequest(method: Method, url: string, parameters: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiServiceInstance({
                method: method,
                url: url,
                data:"",
                params: parameters
            })
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        });
    }
    /* eslint-enable @typescript-eslint/no-explicit-any*/
}

const apiService = new ApiService();
export default apiService;


import apisauce from 'apisauce';
import error from '@/errors';
import axios from 'axios';

const DEFAULT_TIMEOUT = 3000;
const TIMEOUT_ERROR = 'TIMEOUT_ERROR';

export default class ApiGateway {
    _instance;
    //
    constructor(configs){
        const configsGateway = {
            baseURL : configs.endPoint,
             timeout: configs.timeout || DEFAULT_TIMEOUT,
            headers : {
                'Content-Type' : 'application/json',
            }
        };

        if ( configs.keyName ){
            configsGateway.params = {
                [configs.keyName] : configs.keyValue
            }
        }

        this._instance = apisauce.create(configsGateway);
        this.get = this.get.bind(this);
    }
    //error
    _handleError(error){ 
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error : ', error.message);
        }
        console.log(error.config);	
    }
    //response success
    _handleResponse(response){
        console.log(response);
        return response;
    }
    //get
    get(url, params , configs = null){
        /////need fixing
        axios.get(url,params,configs)
            .then( repsponse => this._handleResponse(response) )
            .catch ( err => this._handleError(err) );  
    }
    //create
    post(url, body, configs){
        axios.post(url, body , configs)
            .then( repsponse => this._handleResponse(response) )
            .catch ( err => this._handleError(err) );
    }

    //update
    put(url,body,configs){
        axios.put(url, body,configs)
            .then( repsponse => this._handleResponse(response) )
            .catch ( err => this._handleError(err) );
    }
    //delete 
    delete(url, configs){
        axios.delete(url, configs)
            .then( repsponse => this._handleResponse(response) )
            .catch( err => this._handleError(err) );
    }
}
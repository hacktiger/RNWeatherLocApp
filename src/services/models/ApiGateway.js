import apisauce from 'apisauce';
//import error from '@/errors';

const DEFAULT_TIMEOUT = 3000;
const TIMEOUT_ERROR = 'TIMEOUT_ERROR';

export default class ApiGateway {
    _instance;
    //
    constructor(configs){
        const configsGateway = ({
            baseURL : configs.endPoint,
            timeout: configs.timeout || DEFAULT_TIMEOUT,
            headers : {
                'Content-Type' : 'application/json',
            }
        });

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
        } else if (error.repsponse.problem == "NETWORK_ERROR"){
            console.log("No internet connection ")
        } else if (error.response.problem == "'TIMEOUT_ERROR'"){
            console.log(" Connection timed out ")
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error : ', error.message);
        }
        console.log(error.config);	
    }
    //response success
    _handleResponse(response){
        // 200 - 300 success
        // 400 - < 500 client error
        // >= 500 server
        console.log(response)
        return response;
    }
    //get
    get(url, params , configs = null){      
        /////need fixing
        this._instance.get(url,params,configs)
            .then(response => this._handleResponse(response))
            .catch ( err => this._handleError(err) )
    }
    //create
    post(url, body, configs){
        this._instance.post(url, body , configs)
            .then( response => this._handleResponse(response) )
            .catch ( err => this._handleError(err) );
    }

    //update
    put(url,body,configs){
        this._instance.put(url, body,configs)
            .then( response => this._handleResponse(response) )
            .catch ( err => this._handleError(err) );
    }
    //delete 
    delete(url, configs){
        this._instance.delete(url, configs)
            .then( response => this._handleResponse(response) )
            .catch( err => this._handleError(err) );
    }
}
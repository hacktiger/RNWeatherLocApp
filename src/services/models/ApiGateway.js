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
            timeout : configs.timeout || DEFAULT_TIMEOUT,
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
    _handleError(response){

    }

    //response
    _handleResponse(response){
        console.log(response);
    }
    //get
    get(url, params , configs = null){
        /////need fixing
        axios.get(url,configs)
            .then( repsponse => this._handleResponse(response) )
            .catch ( err => this._handleError(err) );
            
    }
    //create
    post(url, body,configs){
        axios.post(url, { body }, configs)
            .then( repsponse => this._handleResponse(response) )
            .catch ( err => this._handleError(err) );
    }

    //update
    put(url,body,configs){
        axios.put(url, body,configs)
            .then()
            .catch ( err => this._handleError(err) );
    }
    //delete 
    delete(url, configs){
        axios.delete(url, configs)
            .then()
            .catch( err => this._handleError(err) );
    }


}
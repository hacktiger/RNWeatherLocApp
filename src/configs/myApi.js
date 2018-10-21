
import createCloudConfigs from './configs';
import ApiGateway from '../services/models/ApiGateway';

export const WeatherGateway = new ApiGateway(createCloudConfigs('weather'));

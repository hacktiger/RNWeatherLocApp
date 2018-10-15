import configs from 'configs';
import ApiGateway from '../services/models/ApiGateway';

export const WeatherGateway = new ApiGateway(configs.createCloudConfigs('weather'));

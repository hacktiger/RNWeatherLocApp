// imports
import createCloudConfigs from './configs'
import ApiGateway from '../services/models/ApiGateway'

// exporting new ApiGateways
export const WeatherGateway = new ApiGateway(createCloudConfigs('weather'))
export const UserGateway = new ApiGateway(createCloudConfigs('user'))

/// NOTEs
- import Data1, {Data2, Data3} from '../' ; ( Data1 : export default | Data2, Data3 : export) !important


/// TESTS 
- create ApiGateway(createCloudConfigs('weather'))   :    ok
but WeatherGateway = new ApiGateway(createCloudConfigs('weather')) === unidentified



/// DESIGN
file legends : 
	' * ' (asterisk) : notify a folder
	' - ' (small dash) : notify file ( ex : .js files )
	' + ' (plus) : notify contents of file ( funcs/ imports/ constructors/ ... )

WeatherForecastApp : 

*src
	* model
		// get APIs, ... 
		- Map
			+ const PATH :
			+ getCurrentLatLong() : return { lat: , long: }
			
		- Weather	
			// maybe use functions from Map to get lat long		
			+ getLocationKey(lat, long) : return locationKey
			+ get5DaysForecast(locationKey) : return forecast{}
	* control
		- HomeController
		- MapController
			+ Map /* from model */ mapModel = new Map()
				+ setCurrentLocation() : mapModel.getCurrentLatLong() => this.setState({ lat : , long : })
		- WeatherController
			+ Weather /* from model */ weatherModel = new Weather()
				+ async getWeatherForecast() {
					key = await weatherModel.getLocationKey() 
					if ( key ) { // or smt handle error
						await watherModel.get5DaysForecast 
						get5DaysForecast ? return forecast ? return error
					} else {
						show error !
					}				
	* view
		* common
			- common components
		* Screens
			- Home : // Display home page or smt
			- MapView extends Component : // Display view of map
				+ state = {lat : , long :}
				+ MapController control = new MapController()
					+ control.getCurrentLocation()
				+ render() {
					- Map : lat long
					- MapMarker : lat long
				} 
			- WeatherView extends Component : // Display view of weather forecast
				+ state = { forecastList : [] }
				+ WeatherController weatherControl = new WeatherController()
					+ weatherControl.get5DaysForcast -> setState ({})
					+ render() {
						- 5DaysForecast
					}
// my imports
import Map from '../services/data/MapDataService'
// init Map() from MapDataService
const myMap = new Map()
// Class
class MapController {
  async retrieveMyCurrentPosition () {
    await myMap.setMyCoords()
    let coords = await myMap.getMyCoords()
    return coords
  }
}

//
export default MapController

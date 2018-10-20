//
//
 
class Map{
  // my coordinates
  myCoords = {
    LATITUDE : 2,
    LONGITUDE : 4,
  }
  // setter
  setMyCoords = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        // for some reason cant return from here
        position => {
            this.myCoords.LATITUDE = position.coords.latitude;
            this.myCoords.LONGITUDE = position.coords.longitude;
            resolve();
        },
        (err => {
          console.log(err);
          reject('Error');
        }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      ); // end get geolocation.getCurrentPosition
    });
  }
  // getter
  getMyCoords = () => {
    return this.myCoords;
  }
}
// export Map
export default Map


// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
//
import Map from '../services/models/MapDataService' 
//

class MapController {
  constructor () {
    this.myMap = new Map()
  }

  async retrieveMyCurrentPosition () {
    await this.myMap.setMyCoords();
    let coords = await this.myMap.getMyCoords();
    return coords ;
  }
}

//
export default MapController ;

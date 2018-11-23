# RNWeatherLocApp

# Purpose:
  Learning react, react-native.
  
  Learn the way to create a structure that easy to maintain.
  
  Learn clean code.
  
  Learn reuseable.
  
  Learn about SOLID.

# TODO
  [x] Create a folder name "configs"
  This folder will contains all configuration of the app. (endpoint, api key, ...)

  [x] RESTFUL

  [x] GET:
  https://www.example.com/getItem/${id}?key=123123
  POST: create
  PUT: update
  DELETE

  [x] Create Login Page w user token

  [x] new Endpoint => list user/load more with flatlist

  [x] constructor not needed 

  [x] handle error only if key not exist
  
  // PRIORITY DECENDING
  [x] limit load/ load ealier on userview and chatview
      [x] chat view
        [x] load ealier
        [x] limit load
      [x] user view
        [x] load ealier
        [x] limit load

  [x] Header in Chat

  [x] Avatar in Chat ? Cus dont have a func to upload avatar so....

  [x] Settings currently does nothing (cant think of anything yet)

  [o] (optional) implement redux ?

  [o] (optional) sort by most messages ( may need to create another object in firebase )

  [x] just to be sure check null before create room

  [] clean code ( check funcs + performance + delete useless things + increase UX)

[x] src rename => public
[x] 1 là static key
[x] 2 là controllers
[] 3 là data
[] 4 là models
[x] 5 là presentation ( now is view )
[] 6 là middlewares
[x] 7 là configs
[] 8 là resources

[x] Attention in Chat.js controller

[x] Finish up Navigation
[x] Make Navigation.js more readable
[] Chat screen header hide on scroll leaves blank => animate list to cover it later
[] Change date => sunday, sat, mon,... for readability
[] Add models to handle data

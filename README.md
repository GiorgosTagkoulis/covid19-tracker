[![Build Status](https://travis-ci.org/GiorgosTagkoulis/covid19-tracker.svg?branch=master)](https://travis-ci.org/GiorgosTagkoulis/covid19-tracker)
# Visualize Covid19 patients in US 

An app that calls the [Data API](https://covidtracking.com/api) from *The Covid Tracking Project*. In this app, a table is presented with the daily updates from the USA per state. The columns include name of state, hospitilized patients and deaths in the last three days.

## The app in Heroku

You can find the app in Heroku in [this link](https://my-covid19-app.herokuapp.com/).

## Install Dependencies

Clone the repo: `git clone git@github.com:GiorgosTagkoulis/covid19-tracker.git`

and change directory to the repo: `cd covid19-tracker`

Install server dependencies: `npm install`

Install client dependencies: `cd client && yarn install`

## Run the server and the client locally

Once back to the root directory of the project `(cd ../` if one following the commands presented here), run the server in production: `npm start`
Run the server in development: `npm start:dev`  

Run the client: `npm run start:client`

To run the tests: `npm t`

## Commence the application locally
Go to your favourite browser and type the address: `localhost:3000`


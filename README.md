# Weski Hotels Search BE + FE

This project consists of a backend and frontend implementation for searching hotels using the Weski API.

## Dependencies

1. should be node version 18 LTS

## Installation

To run the backend server, follow these steps:

1. Navigate to the `hotels-backend` directory in your terminal.
2. Run `yarn` or `npm i` to install the required dependencies.
3. Run `yarn start` or `npm start` to start the backend server.

To run the frontend app, follow these steps:

1. Navigate to the `frontend-hotels` directory in your terminal.
2. Run `yarn` or `npm i` to install the required dependencies.
3. Run `yarn start` or `npm start` to start the frontend app.

Once both the backend and frontend are running, navigate to `http://localhost:3006` in your browser to view the app.

## Usage

On the homepage of the app, you can enter your search query, including the ski site, from date, to date, and group size. Clicking the "Search" button will send the query to the backend, which will return a list of hotels matching the query.

The hotels will be displayed on the results page, with an image, name, location, rate, and price after tax for each hotel. You can click on a hotel to view more details.

# NYC Taxi Trips
Introducing a Vanilla JavaScript Application for NYC Taxi Trip Analysis
Explore the intricacies of New York City taxi trips during January 2017 with this interactive application. By manipulating the data, you can uncover valuable insights, like:

- When is the worst time of day to take a taxi?

## Libraries Used

- **[Chart.js](https://www.chartjs.org/)** ![Chart.js](https://img.shields.io/badge/Chart.js-%20-green?style=flat&logo=chartdotjs)
  - For rendering dynamic and interactive charts.

- **[Parcel](https://parceljs.org/)** ![Parcel](https://img.shields.io/badge/Parcel-%20-blue?style=flat&logo=parcel)
  - A web application bundler that simplifies the build process with zero configuration.

- **[Jest](https://jestjs.io/)** ![Jest](https://img.shields.io/badge/Jest-%20-red?style=flat&logo=jest)
  - For testing the application. Jest is used for running unit tests and ensuring code quality.

## Features

- **Dynamic Chart Rendering**: Uses Chart.js to create and display charts based on user input and data.
- **Filter Data**: Provides functionality to filter data based on vendor and hour, and update the chart accordingly.
- **URL State Management**: Restores UI state based on URL parameters and updates the URL as filters change.
- **UI Elements**: Includes checkboxes, sliders, and dropdowns to interact with the chart and data.
- **Error Handling**: Gracefully handles errors during data fetching and chart rendering.

## Setup and Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/your-app.git

2. **Install dependencies**:
   ```sh
   npm install

3. **Create a .env file in the root directory and add your environment variables**:
   ```env
   API_URL=your_api_url_here
   TOKEN=your_token

4. **Run the development server**:
   ```sh
   npm start

5. **Run test**:
   ```sh
   npm test

## Production
This app is deployed with Surge. You can view the live version of the app at the following link:

[Live Demo](https://solid-building.surge.sh/?vendor=all&hour=all)

## Data Fields and Descriptions
From : [NYC Taxy & Limousine Commission](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page)


- VendorID:	A code indicating the TPEP provider that provided the record. (1= Creative Mobile Technologies, LLC; 2= VeriFone Inc.)
- tpep_pickup_datetime:	The date and time when the meter was engaged.
- tpep_dropoff_datetime:	The date and time when the meter was disengaged.
- Passenger_count:	The number of passengers in the vehicle. (Driver-entered value)
- Trip_distance:	The elapsed trip distance in miles reported by the taximeter.
- PULocationID:	TLC Taxi Zone in which the taximeter was engaged.
- DOLocationID:	TLC Taxi Zone in which the taximeter was disengaged.
- RateCodeID:	The final rate code in effect at the end of the trip. (1= Standard rate, 2=JFK, 3=Newark, 4=Nassau or Westchester, 5=Negotiated fare, 6=Group ride)
- Store_and_fwd_flag:	Indicates whether the trip record was held in vehicle memory before sending to the vendor (Y= store and forward trip, N= not a store and forward trip).
- Payment_type:	A numeric code signifying how the passenger paid for the trip. (1= Credit card, 2= Cash, 3= No charge, 4= Dispute, 5= Unknown, 6= Voided trip)
- Fare_amount:	The time-and-distance fare calculated by the meter.
- Extra:	Miscellaneous extras and surcharges (e.g., rush hour and overnight charges).
- MTA_tax:	$0.50 MTA tax automatically triggered based on the metered rate.
- Improvement_surcharge:	$0.30 improvement surcharge assessed trips at the flag drop.
- Tip_amount:	Tip amount (automatically populated for credit card tips).
- Tolls_amount:	Total amount of all tolls paid in trip.
- Total_amount:	The total amount charged to passengers (excluding cash tips).
- Congestion_Surcharge:	Total amount collected in trip for NYS congestion surcharge.
- Airport_fee:	$1.25 for pick up only at LaGuardia and John F. Kennedy Airports.

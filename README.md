# NYC Taxi Trips
This is a vanilla JavaScript application

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

3. **Create a .env file in the root directory and add your environment variables:**:
   ```env
   API_URL=your_api_url_here
   TOKEN=your_token

4. **Run the development server**:
   ```sh
   npm start

5. **Run test**:
   ```sh
   npm test

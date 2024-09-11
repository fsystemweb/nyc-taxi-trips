import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

// Sample API data (use the real API endpoint)
const API_URL = 'https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json';

// Initialize chart variable
let chart = null;

// Fetching data from API
async function fetchData() {
  try {
    const params = {
      q: "SELECT EXTRACT(HOUR FROM tpep_pickup_datetime) AS hour, vendorid, COUNT(*) AS num_pickups, SUM(total_amount) AS total_amount FROM yellow_tripdata_2017_pipe GROUP BY EXTRACT(HOUR FROM tpep_pickup_datetime), vendorid ORDER BY hour, vendorid"
    };

    const url = new URL(API_URL);
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString(), {
      headers: {
      }
    });

    const responseJson = await response.json();
    const data = responseJson.data;

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Filtering data by vendor ID and hour
function filterData(data, vendorId, hour) {
  return data.filter(item =>
    (vendorId === 'all' || item.vendorid === parseInt(vendorId)) &&
    (hour === 'all' || item.hour === parseInt(hour))
  );
}

// Destroy the existing chart instance
function destroyChart() {
  if (chart) {
    chart.destroy();
    chart = null;  // Set chart to null after destruction
  }
}

// Rendering chart
function renderChart(data) {
  if (!data || data.length === 0) {
    console.error('No data to display.'); // Debugging
    return;
  }

  // Prepare data for Chart.js
  const hours = data.map(entry => entry.hour);
  const numPickups = data.map(entry => entry.num_pickups);
  const totalAmount = data.map(entry => entry.total_amount);

  // Determine chart type based on filters
  let chartType = '';
  if (document.getElementById('all-hours').checked) {
    chartType = 'line';
  } else {
    const isFiltered = document.getElementById('vendor-filter').value !== 'all' || document.getElementById('hour-slider').value !== 'all';
    chartType = isFiltered ? 'bar' : 'line';
  }

  // Destroy existing chart instance
  destroyChart();

  // Create the chart
  const ctx = document.getElementById('taxiChart').getContext('2d');
  chart = new Chart(ctx, {
    type: chartType, // Set chart type dynamically
    data: {
      labels: hours,
      datasets: [
        {
          label: 'Number of Pickups',
          data: numPickups,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: chartType === 'line' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.5)',
          yAxisID: 'y1',
        },
        {
          label: 'Total Amount',
          data: totalAmount,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: chartType === 'line' ? 'rgba(153, 102, 255, 0.2)' : 'rgba(153, 102, 255, 0.5)',
          yAxisID: 'y2',
        }
      ]
    },
    options: {
      scales: {
        y1: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Number of Pickups'
          },
          ticks: {
            callback: function (value) {
              // Format ticks for readability
              return value.toLocaleString();
            }
          }
        },
        y2: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Total Amount'
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value) {
              // Format ticks for readability
              return `$${value.toLocaleString()}`;
            }
          }
        }
      }
    }
  });
}

// Handling filter change
function handleFilterChange(data) {
  const vendorFilter = document.getElementById('vendor-filter');
  const hourSlider = document.getElementById('hour-slider');
  const hourValue = document.getElementById('hour-value');
  const allHoursCheckbox = document.getElementById('all-hours');


  // Handle vendor filter change
  vendorFilter.addEventListener('change', (e) => {
    document.getElementById('all-hours').checked = false;
    const filteredData = filterData(data, e.target.value, hourSlider.value);
    renderChart(filteredData);
    updateURL(e.target.value, hourSlider.value);
  });

  // Handle hour slider change
  hourSlider.addEventListener('input', (e) => {
    document.getElementById('all-hours').checked = false;
    hourValue.textContent = e.target.value;
    const filteredData = filterData(data, vendorFilter.value, e.target.value);
    renderChart(filteredData);
    updateURL(vendorFilter.value, e.target.value);
  });

  allHoursCheckbox.addEventListener('change', () => {
    hourSlider.disabled = allHoursCheckbox.checked;

    const filteredData = filterData(data, vendorFilter.value, 'all');
    renderChart(filteredData);
    updateURL(vendorFilter.value, 'all');
  });

}

// Deep linking (saving state in URL)
function updateURL(vendorId, hour) {
  const url = new URL(window.location);
  url.searchParams.set('vendor', vendorId);
  url.searchParams.set('hour', hour);
  window.history.pushState({}, '', url);
}

// Restoring state from URL
function restoreStateFromURL(data) {
  const urlParams = new URLSearchParams(window.location.search);
  const vendorId = urlParams.get('vendor') || 'all';
  const hour = urlParams.get('hour') || 'all';

  if (vendorId === 'all' && hour === 'all') {
    document.getElementById('all-hours').checked = true;
    document.getElementById('hour-slider').disabled=true;
  }

  document.getElementById('vendor-filter').value = vendorId;
  document.getElementById('hour-slider').value = hour;
  document.getElementById('hour-value').textContent = hour;

  const filteredData = filterData(data, vendorId, hour);
  renderChart(filteredData);
}

// Initializing the dashboard
async function initDashboard() {  
  const data = await fetchData();
  if (data) {
    handleFilterChange(data);
    restoreStateFromURL(data);
  }
}

initDashboard();

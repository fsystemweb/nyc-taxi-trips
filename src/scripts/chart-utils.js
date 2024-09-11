import Chart from 'chart.js/auto';

let chartInstance = null;

export function renderChart(data) {
  if (!data || data.length === 0) {
    console.error('No data to display.');
    return;
  }

  const hours = data.map(entry => entry.hour);
  const numPickups = data.map(entry => entry.num_pickups);
  const totalAmount = data.map(entry => entry.total_amount);


  let chartType = '';
  if (document.getElementById('all-hours').checked) {
    chartType = 'line';
  } else {
    const isFiltered = document.getElementById('vendor-filter').value !== 'all' || document.getElementById('hour-slider').value !== 'all';
    chartType = isFiltered ? 'bar' : 'line';
  }

  destroyChart();

  const ctx = document.getElementById('taxiChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: chartType,
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
          }
        },
        y2: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Total Amount'
          },
        }
      }
    }
  });
}

function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

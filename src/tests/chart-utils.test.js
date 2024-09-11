import { renderChart } from '../scripts/chart-utils';

jest.mock('chart.js/auto', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      destroy: jest.fn(),
    })),
  };
});

const { default: Chart } = require('chart.js/auto');

beforeEach(() => {
  document.body.innerHTML = `
    <canvas id="taxiChart"></canvas>
    <input type="checkbox" id="all-hours">
    <select id="vendor-filter">
      <option value="all">All Vendors</option>
      <option value="1">Vendor 1</option>
    </select>
    <input type="range" id="hour-slider" min="0" max="23" value="0">
    <span id="hour-value">0</span>
  `;

  const mockCanvasContext = {
    beginPath: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
    lineWidth: jest.fn(),
    lineCap: jest.fn(),
    lineJoin: jest.fn(),
    setLineDash: jest.fn(),
    strokeStyle: jest.fn(),
    fillStyle: jest.fn(),
    arc: jest.fn(),
    rect: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    scale: jest.fn(),
    drawImage: jest.fn(),
    measureText: jest.fn().mockReturnValue({ width: 0 }),
    getImageData: jest.fn(),
    putImageData: jest.fn(),
    createLinearGradient: jest.fn(),
    createPattern: jest.fn(),
    createRadialGradient: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    clearRect: jest.fn(),
  };

  HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCanvasContext);

  Chart.mockClear();
});

describe('renderChart', () => {
  it('should handle empty data gracefully', () => {
    console.error = jest.fn();

    renderChart([]);
    
    expect(console.error).toHaveBeenCalledWith('No data to display.');
    expect(Chart).not.toHaveBeenCalled();
  });

  it('should create a line chart when all-hours checkbox is checked', () => {
    document.getElementById('all-hours').checked = true;

    const data = [
      { hour: '0', num_pickups: 5, total_amount: 100 },
      { hour: '1', num_pickups: 10, total_amount: 200 },
    ];

    renderChart(data);

    expect(Chart).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({
      type: 'line',
    }));
  });

  it('should create a bar chart when filters are applied', () => {
    document.getElementById('vendor-filter').value = '1';
    document.getElementById('hour-slider').value = '1';

    const data = [
      { hour: '1', num_pickups: 15, total_amount: 300 },
    ];

    renderChart(data);

    expect(Chart).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({
        type: 'bar',
      }));
  });

  it('should destroy existing chart instance before creating a new one', () => {
    const data = [
        { hour: '2', num_pickups: 20, total_amount: 400 },
      ];
  
      renderChart(data);

      renderChart(data)
  
      expect(Chart).toHaveBeenCalledTimes(2);
  });
});

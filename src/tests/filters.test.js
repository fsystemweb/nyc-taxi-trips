import { restoreStateFromURL, handleFilterChange } from '../scripts/filters';
import { renderChart } from '../scripts/chart-utils';

jest.mock('../scripts/chart-utils', () => ({
  renderChart: jest.fn(),
}));

describe('Filter Utilities', () => {
  const mockData = [
    { hour: 12, vendorid: 1, num_pickups: 100, total_amount: 500 },
    { hour: 13, vendorid: 2, num_pickups: 200, total_amount: 600 },
  ];

  beforeEach(() => {
    document.body.innerHTML = `
      <select id="vendor-filter">
        <option value="all">All Vendors</option>
        <option value="1">Vendor 1</option>
        <option value="2">Vendor 2</option>
      </select>
      <input id="hour-slider" type="range" min="0" max="23" value="0">
      <span id="hour-value">0</span>
      <input type="checkbox" id="all-hours">
    `;
  });

  it('should restore state from URL and render the chart correctly', () => {
    window.history.pushState({}, '', '?vendor=1&hour=12');
    restoreStateFromURL(mockData);

    expect(document.getElementById('vendor-filter').value).toBe('1');
    expect(document.getElementById('hour-slider').value).toBe('12');
    expect(document.getElementById('hour-value').textContent).toBe('12');
    expect(renderChart).toHaveBeenCalledWith([
      { hour: 12, vendorid: 1, num_pickups: 100, total_amount: 500 },
    ]);
  });

  it('should handle filter change and update the chart', () => {
    const vendorFilter = document.getElementById('vendor-filter');
    const hourSlider = document.getElementById('hour-slider');
    const renderChartMock = jest.fn();
    jest.spyOn(require('../scripts/chart-utils'), 'renderChart').mockImplementation(renderChartMock);

    handleFilterChange(mockData);

    vendorFilter.value = '1';
    hourSlider.value = '12';

    vendorFilter.dispatchEvent(new Event('change'));
    expect(renderChartMock).toHaveBeenCalledWith([
      { hour: 12, vendorid: 1, num_pickups: 100, total_amount: 500 },
    ]);

    hourSlider.dispatchEvent(new Event('input'));
    expect(renderChartMock).toHaveBeenCalledWith([
      { hour: 12, vendorid: 1, num_pickups: 100, total_amount: 500 },
    ]);
  });
});

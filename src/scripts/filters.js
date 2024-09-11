import { renderChart } from './chart-utils.js';



export function restoreStateFromURL(data) {
  const urlParams = new URLSearchParams(window.location.search);
  const vendorId = urlParams.get('vendor') || 'all';
  const hour = urlParams.get('hour') || 'all';

  console.log("vendorid", vendorId)
  console.log("hour", hour)

  if (vendorId === 'all' && hour === 'all') {
    document.getElementById('all-hours').checked = true;
    document.getElementById('hour-slider').disabled = true;
  }

  document.getElementById('vendor-filter').value = vendorId;
  document.getElementById('hour-slider').value = hour;
  document.getElementById('hour-value').textContent = hour;

  const filteredData = filterData(data, vendorId, hour);
  renderChart(filteredData);
}

export function handleFilterChange(data) {
  const vendorFilter = document.getElementById('vendor-filter');
  const hourSlider = document.getElementById('hour-slider');
  const hourValue = document.getElementById('hour-value');
  const allHoursCheckbox = document.getElementById('all-hours');

  vendorFilter.addEventListener('change', (e) => {
    document.getElementById('all-hours').checked = false;
    const filteredData = filterData(data, e.target.value, hourSlider.value);
    renderChart(filteredData);
    updateURL(e.target.value, hourSlider.value);
  });

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

function filterData(data, vendorId, hour) {
  return data.filter(item =>
    (vendorId === 'all' || item.vendorid === parseInt(vendorId)) &&
    (hour === 'all' || item.hour === parseInt(hour))
  );
}

function updateURL(vendorId, hour) {
  const url = new URL(window.location);
  url.searchParams.set('vendor', vendorId);
  url.searchParams.set('hour', hour);
  window.history.pushState({}, '', url);
}

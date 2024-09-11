import { fetchData } from './fetch-data.js';
import { handleFilterChange, restoreStateFromURL } from './filters.js';


async function initDashboard() {
  const data = await fetchData();
  if (data) {
    handleFilterChange(data);
    restoreStateFromURL(data);
  }
}

initDashboard();

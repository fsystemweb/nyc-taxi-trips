// Mocking Chart.js, since we don't want to actually render a chart in our tests
jest.mock('chart.js', () => ({
    Chart: jest.fn(() => ({
      destroy: jest.fn(),
    }))
  }));
  
  // Import functions from the script.js
  const { fetchData, filterData, updateURL, restoreStateFromURL } = require('./script');
  
  // Mock global fetch
  global.fetch = jest.fn();
  
  // Mock window.history.pushState
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      search: ''
    }
  });
  const mockPushState = jest.fn();
  window.history.pushState = mockPushState;
  
  describe('fetchData', () => {
    beforeEach(() => {
      fetch.mockClear();
    });
  
    it('should fetch data from the API', async () => {
      const mockData = [{ trip_distance: 5 }];
      fetch.mockResolvedValueOnce({
        json: async () => mockData
      });
  
      const data = await fetchData();
  
      expect(data).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  
    it('should return null on fetch error', async () => {
      fetch.mockRejectedValueOnce(new Error('Fetch error'));
  
      const data = await fetchData();
  
      expect(data).toBeNull();
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('filterData', () => {
    const mockData = [
      { vendorid: 1, trip_distance: 5 },
      { vendorid: 2, trip_distance: 10 }
    ];
  
    it('should return all data when vendorId is "all"', () => {
      const filteredData = filterData(mockData, 'all');
      expect(filteredData).toEqual(mockData);
    });
  
    it('should filter data by vendorId 1', () => {
      const filteredData = filterData(mockData, '1');
      expect(filteredData).toEqual([{ vendorid: 1, trip_distance: 5 }]);
    });
  
    it('should filter data by vendorId 2', () => {
      const filteredData = filterData(mockData, '2');
      expect(filteredData).toEqual([{ vendorid: 2, trip_distance: 10 }]);
    });
  });
  
  describe('updateURL', () => {
    it('should update the URL with the selected vendorId', () => {
      updateURL('1');
      expect(mockPushState).toHaveBeenCalledWith({}, '', expect.stringContaining('vendor=1'));
  
      updateURL('all');
      expect(mockPushState).toHaveBeenCalledWith({}, '', expect.stringContaining('vendor=all'));
    });
  });
  
  describe('restoreStateFromURL', () => {
    const mockData = [
      { vendorid: 1, trip_distance: 5 },
      { vendorid: 2, trip_distance: 10 }
    ];
  
    beforeEach(() => {
      document.body.innerHTML = `
        <select id="vendor-filter">
          <option value="all">All</option>
          <option value="1">Vendor 1</option>
          <option value="2">Vendor 2</option>
        </select>
        <canvas id="tripChart"></canvas>
      `;
    });
  
    it('should restore filter state from URL with vendorId 1', () => {
      window.location.search = '?vendor=1';
      restoreStateFromURL(mockData);
  
      const vendorFilter = document.getElementById('vendor-filter');
      expect(vendorFilter.value).toBe('1');
    });
  
    it('should restore filter state from URL with vendorId "all"', () => {
      window.location.search = '?vendor=all';
      restoreStateFromURL(mockData);
  
      const vendorFilter = document.getElementById('vendor-filter');
      expect(vendorFilter.value).toBe('all');
    });
  });
  
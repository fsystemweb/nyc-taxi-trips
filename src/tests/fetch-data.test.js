import { fetchData } from '../scripts/fetch-data';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: [
          { hour: 12, vendorid: 1, num_pickups: 100, total_amount: 500 },
        ],
      }),
  })
);

describe('fetchData', () => {
  it('should fetch data and return the expected results', async () => {

    const data = await fetchData();
    expect(data).toEqual([
      { hour: 12, vendorid: 1, num_pickups: 100, total_amount: 500 },
    ]);
  });

  it('should handle fetch errors gracefully', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
    console.error = jest.fn();

    const data = await fetchData();

    expect(data).toBe(null);
    expect(console.error).toHaveBeenCalledWith('Error fetching data:', new Error('API is down'));
  });
});

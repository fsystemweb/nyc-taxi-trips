

const API_URL = process.env.API_URL;
const BEARER_TOKEN = process.env.TOKEN;

export async function fetchData() {
  try {
    const params = {
      q: `SELECT EXTRACT(HOUR FROM tpep_pickup_datetime) AS hour, vendorid, 
          COUNT(*) AS num_pickups, SUM(total_amount) AS total_amount 
          FROM yellow_tripdata_2017_pipe 
          GROUP BY EXTRACT(HOUR FROM tpep_pickup_datetime), vendorid 
          ORDER BY hour, vendorid`
    };

    const url = new URL(API_URL);
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`      }
    });

    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

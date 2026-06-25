require('dotenv').config();
const appId = process.env.OPEN_EXCHANGE_RATES_APP_ID;
async function run() {
  try {
    const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
    const data = await res.json();
    console.log("Response:", data);
  } catch(e) { console.error(e); }
}
run();

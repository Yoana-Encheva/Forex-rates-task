const baseUrl = "http://127.0.0.1:5500/currencies.json";

// get data from json
export async function getCurrencies() {
  const token = localStorage.getItem("userToken");

  let result = (await fetch(baseUrl)).json();

  return result;
}

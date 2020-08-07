import { getCurrencies } from "../data.js";

const currencyList = {
  EUR: { name: "EURO", url: "../images/european-union-flag.png" },
  USD: { name: "U.S.DOLLAR", url: "../images/united-states-flag.png" },
  AUD: { name: "AUSTRALIAN DOLLAR", url: "../images/australia-flag.png" },
  CAD: { name: "CANADIAN DOLLAR", url: "../images/canada-flag.png" },
  BGN: { name: "BULGARIAN LEV", url: "../images/bulgaria-flag.png" },
};

export default async function home() {
  this.partials = {
    footer: await this.load("./templates/common/footer.hbs"),
  };

  let currencies = await getCurrencies();
  const baseCurrency = currencies.base;
  const rates = [];

  for (const rate in currencies.rates) {
    rates.push({
      currency: rate,
      price: Number(currencies.rates[rate]).toFixed(4),
      base: baseCurrency,
      pair: `${currencyList[baseCurrency].name} / ${currencyList[rate].name}`,
      baseUrl: currencyList[baseCurrency].url,
      currencyUrl: currencyList[rate].url,
    });
  }

  this.app.userData.currencies = rates;

  this.partial("./templates/home.hbs", this.app.userData);

  let tablePriceElements = [];

  setTimeout(function () {
    tablePriceElements = Array.from(document.getElementsByClassName("price"));
  }, 1000);

  function increasePrice() {
    tablePriceElements.forEach((el) => {
      let currentRate = Number(el.textContent);
      let newRate = currentRate + 0.0001;
      el.textContent = newRate.toFixed(4);
      el.style.background = "green";
    });
  }

  function decreasePrice() {
    tablePriceElements.forEach((el) => {
      let currentRate = Number(el.textContent);
      let newRate = currentRate - 0.0001;

      if (newRate > 1.0001) {
        el.textContent = newRate.toFixed(4);
        el.style.background = "red";
      }
    });
  }

  function priceRevercing() {
    if (!isPriceIncreasing) {
      isPriceIncreasing = true;
      clearInterval(priceDecreasingInterval);
      priceIncreasingInterval = setInterval(increasePrice, 5000);
    } else if (isPriceIncreasing) {
      isPriceIncreasing = false;
      clearInterval(priceIncreasingInterval);
      priceDecreasingInterval = setInterval(decreasePrice, 5000);
    }
  }

  let priceIncreasingInterval = "";
  let priceDecreasingInterval = "";
  let isPriceIncreasing = true;

  priceIncreasingInterval = setInterval(increasePrice, 5000);

  let priceRevercingInterval = setInterval(priceRevercing, 60000);

  setTimeout(function () {
    clearInterval(priceDecreasingInterval);
    clearInterval(priceIncreasingInterval);
    clearInterval(priceRevercingInterval);
  }, 300000);
}

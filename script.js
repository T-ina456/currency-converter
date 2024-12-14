// Fetch currency data and populate dropdowns
const currencyApiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');

// Populate currency options
fetch(currencyApiUrl)
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });
  })
  .catch(error => {
    console.error('Error fetching currency data:', error);
  });

// Convert currency
convertBtn.addEventListener('click', () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = parseFloat(amount.value);

  if (isNaN(amountValue)) {
    result.textContent = 'Please enter a valid amount.';
    return;
  }

  fetch(currencyApiUrl)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[to] / data.rates[from];
      const convertedAmount = (amountValue * rate).toFixed(2);
      result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
    })
    .catch(error => {
      console.error('Error converting currency:', error);
      result.textContent = 'Error converting currency. Try again later.';
    });
});

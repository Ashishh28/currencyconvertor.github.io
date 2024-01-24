document.addEventListener('DOMContentLoaded', function() {
  populateCurrencies();
});

function populateCurrencies() {
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');

  fetch('https://open.er-api.com/v6/latest')
    .then(response => response.json())
    .then(data => {
      const currencies = Object.keys(data.rates);
      
      currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');

        option1.value = currency;
        option1.textContent = currency;

        option2.value = currency;
        option2.textContent = currency;

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
      });
    });
}

function convertCurrency() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = document.getElementById('amount').value;
  const resultField = document.getElementById('result');

  fetch(`https://open.er-api.com/v6/latest`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[toCurrency] / data.rates[fromCurrency];
      const result = (amount * rate).toFixed(2);

      resultField.value = result;
    })
    .catch(error => console.error('Error:', error));
}

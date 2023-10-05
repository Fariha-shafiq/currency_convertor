const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');

// Fetch list of currencies from the API
fetch('https://openexchangerates.org/api/currencies.json')
    .then(response => response.json())
    .then(data => {
        for (const currencyCode in data) {
            const option = document.createElement('option');
            option.value = currencyCode;
            option.textContent = `${currencyCode} - ${data[currencyCode]}`;
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option.cloneNode(true));
        }
    });

// Event listener for the convert button
convertBtn.addEventListener('click', () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = amountInput.value;

    if (!fromCurrency || !toCurrency || !amount) {
        resultDiv.textContent = 'Please select currencies and enter an amount.';
        return;
    }

    // Fetch exchange rates from the API
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}.`;
        })
        .catch(error => {
            resultDiv.textContent = 'Error fetching exchange rates. Please try again later.';
            console.error(error);
        });
});

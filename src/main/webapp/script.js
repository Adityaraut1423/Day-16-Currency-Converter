const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const result = document.getElementById("result");

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

currencies.forEach(currency => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
    const amount = document.getElementById("amount").value;

    if (amount === "" || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    result.textContent = "Converting...";

    try {
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`
        );
        const data = await response.json();

        const rate = data.rates[toCurrency.value];
        const converted = (amount * rate).toFixed(2);

        result.textContent = 
            `${amount} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
    } catch (error) {
        result.textContent = "Error fetching exchange rates 😢";
    }
}

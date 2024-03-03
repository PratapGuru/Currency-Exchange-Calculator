const currency_element_one = document.getElementById("currency-one");
const currency_element_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

const rate_element = document.getElementById("rate");
const change = document.getElementById("change");

//Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currency_element_one.value;
  const currency_two = currency_element_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/ca53b24e5694ae11ba363018/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_two];
      rate_element.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currency_element_one.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate);
currency_element_two.addEventListener("change", calculate);
amount_two.addEventListener("input", calculate);

change.addEventListener("click", () => {
  const temp = currency_element_one.value;
  currency_element_one.value = currency_element_two.value;
  currency_element_two.value = temp;
  calculate();
});

calculate();

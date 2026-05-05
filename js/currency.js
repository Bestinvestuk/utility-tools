let cachedRates = {};
let lastFetch = 0;

async function fetchRates(base = 'USD') {
  const now = Date.now();
  if (cachedRates[base] && (now - lastFetch) < 600000) return cachedRates[base]; // 10min cache

  try {
    // More reliable free API (CORS-friendly, no key required)
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    cachedRates[base] = data.rates;
    lastFetch = now;
    return data.rates;
  } catch (err) {
    console.error('Currency API fallback:', err);
    // Fallback static rates so tool never breaks
    return { EUR: 0.92, GBP: 0.79, JPY: 154.2, CAD: 1.36, AUD: 1.52 };
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const resultDiv = document.getElementById('currencyResult');

  if (from === to) {
    resultDiv.innerHTML = `<h3>${amount} ${from} = ${amount} ${to}</h3><p>Same currency selected.</p>`;
    return resultDiv.classList.add('show');
  }

  let rates = await fetchRates(from);
  if (!rates) rates = await fetchRates('USD'); // fallback chain

  const rate = rates[to];
  if (!rate) {
    resultDiv.innerHTML = `<p style="color:#ef4444">Unable to fetch rate for ${to}. Try again later.</p>`;
    return resultDiv.classList.add('show');
  }

  const converted = (amount * rate).toFixed(2);
  resultDiv.innerHTML = `<h3>${amount} ${from} = ${converted} ${to}</h3><p>Rate: 1 ${from} ≈ ${rate.toFixed(4)} ${to} | Updated: ${new Date().toLocaleTimeString()}</p>`;
  resultDiv.classList.add('show');
}
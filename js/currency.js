let cachedRates = {};
let lastFetch = 0;

async function fetchRates(base = 'USD') {
  const now = Date.now();
  if (cachedRates[base] && (now - lastFetch) < 900000) return cachedRates[base]; // 15min cache

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
    if (!res.ok) throw new Error('API limit reached');
    const data = await res.json();
    cachedRates[base] = data.rates;
    lastFetch = now;
    return data.rates;
  } catch (err) {
    console.error('Currency API Error:', err);
    return null;
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  if (from === to) {
    document.getElementById('currencyResult').innerHTML = `<h3>${amount} ${from} = ${amount} ${to}</h3><p>Same currency selected.</p>`;
    return document.getElementById('currencyResult').classList.add('show');
  }

  let rates = await fetchRates(from);
  if (!rates) {
    // Fallback: fetch via USD
    rates = await fetchRates('USD');
    if (!rates) return alert('Failed to fetch exchange rates. Try again later.');
  }

  const rate = rates[to] || 1 / (await fetchRates(to))[from];
  const converted = (amount * rate).toFixed(2);

  const res = document.getElementById('currencyResult');
  res.innerHTML = `<h3>${amount} ${from} = ${converted} ${to}</h3><p>Rate: 1 ${from} = ${rate.toFixed(4)} ${to} (Updated: ${new Date().toLocaleTimeString()})</p>`;
  res.classList.add('show');
}
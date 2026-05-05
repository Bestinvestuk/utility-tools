function calculateMortgage() {
  const price = parseFloat(document.getElementById('price').value) || 0;
  const down = parseFloat(document.getElementById('down').value) || 0;
  const years = parseFloat(document.getElementById('years').value) || 30;
  const rate = parseFloat(document.getElementById('rate').value) || 0;
  const tax = parseFloat(document.getElementById('tax').value) || 0;
  const insurance = parseFloat(document.getElementById('insurance').value) || 0;

  const principal = price - down;
  const r = rate / 100 / 12;
  const n = years * 12;

  let monthlyPI = 0;
  if (r > 0) {
    monthlyPI = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    monthlyPI = principal / n;
  }

  const monthlyTax = tax / 12;
  const monthlyIns = insurance / 12;
  const total = monthlyPI + monthlyTax + monthlyIns;

  const res = document.getElementById('mortgageResult');
  res.innerHTML = `
    <h3>Estimated Monthly Payment: $${total.toFixed(2)}</h3>
    <p>Principal & Interest: $${monthlyPI.toFixed(2)} | Tax: $${monthlyTax.toFixed(2)} | Insurance: $${monthlyIns.toFixed(2)}</p>
    <p>Total Loan Amount: $${principal.toLocaleString()} | Total Interest: $${(monthlyPI * n - principal).toLocaleString()}</p>
  `;
  res.classList.add('show');
}
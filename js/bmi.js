function calculateBMI() {
  let height = parseFloat(document.getElementById('height').value);
  let weight = parseFloat(document.getElementById('weight').value);
  const hUnit = document.getElementById('heightUnit').value;
  const wUnit = document.getElementById('weightUnit').value;

  if (!height || !weight) return alert('Please enter both height and weight.');

  // Convert to metric
  if (hUnit === 'in') height *= 2.54;
  if (wUnit === 'lbs') weight *= 0.453592;

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  let category = '', color = '';

  if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; }
  else if (bmi < 25) { category = 'Normal'; color = '#10b981'; }
  else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; }
  else { category = 'Obese'; color = '#ef4444'; }

  const res = document.getElementById('bmiResult');
  res.innerHTML = `<h3 style="color:${color}">BMI: ${bmi.toFixed(1)} (${category})</h3><p>Healthy range: 18.5–24.9</p>`;
  res.classList.add('show');
}
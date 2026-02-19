let userId = localStorage.getItem("userId");

async function register() {
  await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  alert("Registered");
}

async function login() {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  localStorage.setItem("userId", data.userId);
  window.location = "dashboard.html";
}

async function analyze() {
  const marks = {
    math: Number(math.value),
    science: Number(science.value),
    english: Number(english.value)
  };

  const res = await fetch("http://localhost:5000/analysis/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, marks })
  });

  const data = await res.json();
  result.textContent = JSON.stringify(data, null, 2);

  const prog = await fetch(`http://localhost:5000/analysis/progress/${userId}`);
  const scores = await prog.json();

  new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: scores.map((_, i) => i + 1),
      datasets: [{
        label: "Progress",
        data: scores
      }]
    }
  });
}

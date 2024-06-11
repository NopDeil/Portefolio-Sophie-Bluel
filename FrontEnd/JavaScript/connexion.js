// Récupération des éléments
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form_verify();
});

async function form_verify() {
  let error = document.querySelector(".error");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let req = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value, password: password.value }),
  });
  if (req.status !== 200) {
    email.classList.add("inputError");
    password.classList.add("inputError");
    error.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    return;
  }
  if (req.status === 200) {
    let res = await req.json();
    localStorage.setItem("token", res.token);
    window.location.href = "http://127.0.0.1:5500/FrontEnd/";
  }
}

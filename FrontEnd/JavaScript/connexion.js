// Récupération des éléments
const form = document.getElementById("form"); // Sélectionne le formulaire par son ID

// Ajout d'un écouteur d'événement sur la soumission du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
  form_verify(); // Appelle la fonction de vérification du formulaire
});

// Fonction asynchrone pour vérifier les champs du formulaire et envoyer une requête de connexion
async function form_verify() {
  let error = document.querySelector(".error"); // Sélectionne l'élément d'erreur pour afficher les messages d'erreur
  let email = document.getElementById("email"); // Sélectionne le champ email par son ID
  let password = document.getElementById("password"); // Sélectionne le champ mot de passe par son ID

  // Vérifie si les champs email et mot de passe sont vides
  if (!email.value && !password.value) {
    email.classList.add("inputError"); // Ajoute une classe d'erreur au champ email
    password.classList.add("inputError"); // Ajoute une classe d'erreur au champ mot de passe
    error.innerHTML = "Merci de renseigner un email et un mot de passe"; // Affiche un message d'erreur
    return; // Sort de la fonction
  } else if (!email.value && password.value) {
    email.classList.add("inputError"); // Ajoute une classe d'erreur au champ email
    error.innerHTML = "Merci de renseigner un email"; // Affiche un message d'erreur
    return; // Sort de la fonction
  } else if (email.value && !password.value) {
    password.classList.add("inputError"); // Ajoute une classe d'erreur au champ mot de passe
    error.innerHTML = "Merci de renseigner un mot de passe"; // Affiche un message d'erreur
    return; // Sort de la fonction
  }

  // Envoie une requête POST à l'API pour vérifier les informations de connexion
  let req = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Définit le type de contenu comme JSON
    },
    body: JSON.stringify({ email: email.value, password: password.value }), // Convertit les données du formulaire en JSON pour les envoyer
  });

  // Vérifie si la réponse n'a pas le statut 200 (OK)
  if (req.status !== 200) {
    email.classList.add("inputError"); // Ajoute une classe d'erreur au champ email
    password.classList.add("inputError"); // Ajoute une classe d'erreur au champ mot de passe
    error.innerHTML = "L’identifiant ou le mot de passe n'est pas valide"; // Affiche un message d'erreur
    return; // Sort de la fonction
  }

  // Si la réponse a le statut 200 (OK)
  if (req.status === 200) {
    let res = await req.json(); // Convertit la réponse en JSON
    localStorage.setItem("token", res.token); // Stocke le token dans le stockage local
    window.location.href = "./index.html"; // Redirige l'utilisateur vers la page d'accueil
  }
}

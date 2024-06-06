// Sélectionner l'élément de la galerie
const gallery = document.querySelector(".gallery");
displayWorks();
displayCategories();
// Fonction pour récupérer les données de l'API
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Convertir la réponse en JSON
    const works = await response.json();
    return works;
    // gestion des erreurs
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    throw error; // Rethrow pour permettre la gestion de l'erreur dans la fonction displayWorks
  }
}

async function displayWorks() {
  const works = await fetchWorks();
  works.forEach((work) => {
    createWorks(work);
  });
}

// Fonction pour ajouter dynamiquement les projets à la page
function createWorks(work) {
  // Sélectionner l'élément de la galerie

  // Création l'élément figure
  const figure = document.createElement("figure");
  figure.dataset.categoryId = work.categoryId;
  // Création l'élément img et définir sa source
  const imageProjet = document.createElement("img");
  imageProjet.src = work.imageUrl;
  //   Création de l'élément figcaption et définition du texte
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = work.title;
  // Ajouter img et figcaption à figure
  figure.appendChild(imageProjet);
  figure.appendChild(figcaption);
  // Ajouter figure à la galerie
  gallery.appendChild(figure);
}

// Fonction pour récupérer les données de l'API
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Convertir la réponse en JSON
    return await response.json();
    // gestion des erreurs
  } catch (error) {
    console.error("Erreur lors de la récupération des categories:", error);
    throw error; // Rethrow pour permettre la gestion de l'erreur dans la fonction displayCategories
  }
}

// Fonction pour ajouter dynamiquement les projets à la page
async function displayCategories() {
  try {
    const categories = await fetchCategories();
    console.log(categories);
    const btnTous = {
      id: "",
      name: "Tous",
    };

    categories.unshift(btnTous);
    // Sélectionner l'élément de la galerie
    const filters = document.getElementById("filters");
    // Boucler à travers chaque catégorie pour créer les éléments HTML
    categories?.forEach((category, index) => {
      // Création d'un élément bouton
      let btn = document.createElement("button");
      if (index === 0) {
        btn.classList.add("button-active");
      }
      // ajout du nom des différentes catégories dans ce bouton
      btn.innerText = category.name;
      // Ajout de l'id correspondant à chaque catégorie
      btn.dataset.categoryId = category.id;
      console.log(category);
      btn.addEventListener("click", filterProject);
      // ajout de l'élément bouton dans la div filters
      filters.appendChild(btn);
    });
    // gestion des erreurs
  } catch (error) {
    console.error("Erreur lors de l'affichage des catégories:", error);
  }
}

async function filterProject(event) {
  console.log(event.target);
  const filterWorks = await fetchWorks();
  gallery.innerHTML = "";
  let categoryTargetId = event.target.dataset.categoryId;

  document.querySelectorAll("#portfolio button").forEach((element) => {
    element.classList.remove("button-active");
  });
  event.target.classList.add("button-active");

  console.log(categoryTargetId);
  if (categoryTargetId !== "") {
    filterTriWorks = filterWorks.filter((work) => {
      return work.categoryId == categoryTargetId;
    });
    console.log(filterTriWorks);
    filterTriWorks.forEach((work) => {
      createWorks(work);
    });
  } else {
    displayWorks();
  }
}

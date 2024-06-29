// Sélectionner l'élément de la galerie
const gallery = document.querySelector(".gallery");
const worksModal = document.querySelector(".worksModal");

// Appeler les fonctions pour afficher les travaux et les catégories
displayWorks();
displayCategories();
connected();

// Fonction pour récupérer les données de l'API des travaux
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Convertir la réponse en JSON
    const works = await response.json();
    return works;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    throw error; // Relancer l'erreur pour la gestion dans la fonction displayWorks
  }
}

// Fonction pour afficher les travaux dans la galerie
async function displayWorks() {
  gallery.innerHTML = ""; // Effacer le contenu actuel de la galerie
  const works = await fetchWorks(); // Récupérer les travaux
  works.forEach((work) => {
    createWorks(work); // Créer et ajouter chaque travail à la galerie
  });
}

// Fonction pour ajouter dynamiquement les projets à la page
function createWorks(work) {
  // Création de l'élément figure
  const figure = document.createElement("figure");
  figure.dataset.categoryId = work.categoryId;

  // Création de l'élément img et définition de sa source
  const imageProjet = document.createElement("img");
  imageProjet.src = work.imageUrl;

  // Création de l'élément figcaption et définition du texte
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = work.title;

  // Ajouter img et figcaption à figure
  figure.appendChild(imageProjet);
  figure.appendChild(figcaption);

  // Ajouter figure à la galerie
  gallery.appendChild(figure);
}

// Fonction pour récupérer les données de l'API des catégories
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Convertir la réponse en JSON
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des categories:", error);
    throw error; // Relancer l'erreur pour la gestion dans la fonction displayCategories
  }
}

// Fonction pour afficher dynamiquement les catégories sur la page
async function displayCategories() {
  if (!localStorage.token) {
    try {
      const categories = await fetchCategories();
      console.log(categories);
      const btnTous = {
        id: "",
        name: "Tous",
      };
      categories.unshift(btnTous); // Ajouter un bouton "Tous" au début des catégories

      // Sélectionner l'élément des filtres
      const filters = document.getElementById("filters");

      // Boucler à travers chaque catégorie pour créer les éléments HTML
      categories?.forEach((category, index) => {
        // Création d'un élément bouton
        let btn = document.createElement("button");
        if (index === 0) {
          btn.classList.add("button-active");
        }
        btn.innerText = category.name; // ajout du nom des différentes catégories dans ce bouton
        btn.dataset.categoryId = category.id; // Ajout de l'id correspondant à chaque catégorie
        console.log(category);
        btn.addEventListener("click", filterProject); // Ajouter un écouteur d'événement pour filtrer les projets
        filters.appendChild(btn); // Ajouter le bouton dans la div filters
      });
    } catch (error) {
      console.error("Erreur lors de l'affichage des catégories:", error);
    }
  }
}

// Fonction pour filtrer les projets par catégorie
async function filterProject(event) {
  console.log(event.target);
  const filterWorks = await fetchWorks();
  gallery.innerHTML = "";
  let categoryTargetId = event.target.dataset.categoryId;

  // Mettre à jour l'état des boutons
  document.querySelectorAll("#portfolio button").forEach((element) => {
    element.classList.remove("button-active");
  });
  event.target.classList.add("button-active");

  console.log(categoryTargetId);
  if (categoryTargetId !== "") {
    // Filtrer les travaux par catégorie
    filterTriWorks = filterWorks.filter((work) => {
      return work.categoryId == categoryTargetId;
    });
    console.log(filterTriWorks);
    filterTriWorks.forEach((work) => {
      createWorks(work); // Ajouter chaque travail filtré à la galerie
    });
  } else {
    displayWorks(); // Afficher tous les travaux
  }
}

// Fonction appelée après la connexion de l'utilisateur
function connected() {
  const logout = document.querySelector(".logout");
  const token = localStorage.getItem("token");

  if (token) {
    logout.innerText = "logout";
    logout.href = "";
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "./index.html";
    });

    // Activer le mode édition
    const mode = document.querySelector(".mode");
    mode.classList.add("edition");
    const square1 = document.querySelector(".mode p i");
    square1.classList.add("fa-pen-to-square");
    const spanText = document.querySelector(".mode p span");
    spanText.textContent = "Mode édition";
    const pEdition = document.querySelector(".mode p");
    pEdition.classList.add("pEdition");
    const pModal = document.querySelector("#portfolio p");
    pModal.classList.add("pModal");
    const square2 = document.querySelector("#portfolio p i");
    square2.classList.add("fa-pen-to-square");
    const spanTextModal = document.querySelector("#portfolio p span");
    spanTextModal.textContent = "Modifier";
    const containerModals = document.querySelector(".containerModals");
    const btnAjoutPhoto = document.querySelector(".modalWorks .button");

    displayWorksModal();

    const fileBtn = document.querySelector(".photoModal .button");
    const fileInput = document.getElementById("fileInput");
    const photoModal = document.querySelector(".photoModal");
    const iconImg = document.querySelector(".fa-image");
    const btnImg = document.querySelector(".photoModal button");
    const pFile = document.querySelector(".photoModal p");
    const imgFile = document.createElement("img");
    const formPhotoModal = document.querySelector(".formPhotoModal");

    // Affichage de l'image après l'envoi d'un fichier
    fileBtn.addEventListener("click", (e) => {
      e.preventDefault();
      fileInput.click();
      fileInput.addEventListener("change", () => {
        const files = fileInput.files;
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            imgFile.src = e.target.result;
            imgFile.classList.add("imgFile");
            imgFile.style.display = "flex";
            iconImg.style.display = "none";
            btnImg.style.display = "none";
            pFile.style.display = "none";
          };
          reader.readAsDataURL(file);
        }
        photoModal.appendChild(imgFile);
      });
    });

    pModal.addEventListener("click", () => {
      containerModals.style.display = "block";
    });

    const xmarks = document.querySelector(".containerModals .fa-xmark");
    xmarks.addEventListener("click", () => {
      containerModals.style.display = "none";
    });

    containerModals.addEventListener("click", (e) => {
      if (e.target.className == "containerModals") {
        containerModals.style.display = "none";
      }
    });

    btnAjoutPhoto.addEventListener("click", () => {
      containerModals.style.display = "none";
      containerAddPhotoModals.style.display = "block";
      iconImg.style.display = "block";
      btnImg.style.display = "block";
      pFile.style.display = "block";
      formPhotoModal.reset();
    });

    const containerAddPhotoModals = document.querySelector(
      ".containerAddPhotoModals"
    );
    const xmarks1 = document.querySelector(
      ".containerAddPhotoModals span .fa-xmark"
    );
    const leftArrow = document.querySelector(
      ".containerAddPhotoModals span .fa-arrow-left"
    );

    leftArrow.addEventListener("click", () => {
      containerModals.style.display = "block";
      containerAddPhotoModals.style.display = "none";
      imgFile.style.display = "none";
      formPhotoModal.reset();
    });

    xmarks1.addEventListener("click", () => {
      containerAddPhotoModals.style.display = "none";
      imgFile.style.display = "none";
      formPhotoModal.reset();
    });

    containerAddPhotoModals.addEventListener("click", (e) => {
      if (e.target.className == "containerAddPhotoModals") {
        containerAddPhotoModals.style.display = "none";
        imgFile.style.display = "none";
        formPhotoModal.reset();
      }
    });
    validerForm();
    postWorks();
  }
}

// Fonction pour afficher les travaux dans la modale
async function displayWorksModal() {
  worksModal.innerHTML = "";
  const works = await fetchWorks();
  console.log(works);
  works.forEach((work) => {
    createWorksModal(work);
  });
  deleteWorks();
}

// Fonction pour créer les éléments de travaux dans la modale
function createWorksModal(work) {
  // Création de l'élément figure
  const figure = document.createElement("figure");
  // Création de l'élément img, span et i
  const image = document.createElement("img");
  const span = document.createElement("span");
  const suppr = document.createElement("i");
  suppr.classList.add("fa-solid", "fa-trash-can");
  suppr.dataset.id = work.id;
  image.src = work.imageUrl;
  span.appendChild(suppr);
  figure.appendChild(span);
  figure.appendChild(image);
  worksModal.appendChild(figure);
}

// Fonction pour ajouter un projet via la modale
function postWorks() {
  const formPhotoModal = document.querySelector(".formPhotoModal");
  const titleForm = document.querySelector(".formPhotoModal #titre");
  const fileInput = document.getElementById("fileInput");
  const categoryForm = document.querySelector(".formPhotoModal #category");
  const token = localStorage.getItem("token");

  formPhotoModal.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", titleForm.value);
    formData.append("image", fileInput.files[0]);
    formData.append("category", categoryForm.value);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (response.status !== 201) {
        throw new Error("HTTP error! Status: " + response.status);
      }

      if (response.status === 201) {
        console.log("Ce projet à été ajouté !");
        displayWorksModal();
        displayWorks();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet:", error);
    }
  });
}

// Fonction pour valider le formulaire de la modale
function validerForm() {
  const formPhotoModal = document.querySelector(".formPhotoModal");
  const titleForm = document.querySelector(".formPhotoModal #titre");
  const fileInput = document.getElementById("fileInput");
  const categoryForm = document.querySelector(".formPhotoModal #category");
  const btnValid = document.querySelector(".formPhotoModal .btnValid");

  formPhotoModal.addEventListener("input", () => {
    if (titleForm.value && categoryForm.value && fileInput.value) {
      btnValid.classList.add("enabled");
      btnValid.disabled = false;
    } else {
      btnValid.classList.remove("enabled");
      btnValid.disabled = true;
    }
  });
}

// Fonction pour supprimer un projet dans la modale
function deleteWorks() {
  const trashCan = document.querySelectorAll(".fa-trash-can");
  console.log(trashCan);
  const token = localStorage.getItem("token");
  trashCan.forEach((trash) => {
    trash.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = trash.dataset.id;
      console.log(id);
      try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.status !== 204) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.status === 204) {
          console.log("Ce projet à été supprimé !");
          displayWorksModal();
          displayWorks();
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du projet:", error);
      }
    });
  });
}

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

// Fonction pour ajouter dynamiquement les projets à la page
async function displayWorks() {
  try {
    const works = await fetchWorks();
      // Sélectionner l'élément de la galerie
    const gallery = document.querySelector(".gallery");
      // Boucler à travers chaque projet pour créer les éléments HTML
    for (let i = 0; i < works.length; i++) {
        // Création l'élément figure 
      const figure = document.createElement("figure");
       // Création l'élément img et définir sa source
      const imageProjet = document.createElement("img");
      imageProjet.src = works[i].imageUrl;
    //   Création de l'élément figcaption et définition du texte
      const figcaption = document.createElement("figcaption");
      figcaption.innerText = works[i].title;
        // Ajouter img et figcaption à figure
      figure.appendChild(imageProjet);
      figure.appendChild(figcaption);
       // Ajouter figure à la galerie
      gallery.appendChild(figure);
    }
    // gestion des erreurs
  } catch (error) {
    console.error("Erreur lors de l'affichage des projets:", error);
  }
}

displayWorks();
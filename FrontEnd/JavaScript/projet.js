// Récupérer les données de l'API
fetch("http://localhost:5678/api/works")
  .then(response => response.json())  // Convertir la réponse en JSON
  .then(projet => {
    console.log(projet);  // Vérifier les données récupérées

    // Sélectionner l'élément de la galerie
    const gallery = document.querySelector(".gallery");

    // Boucler à travers chaque projet pour créer les éléments HTML
    for (let i = 0; i < projet.length; i++) {
      const figure = document.createElement("figure");

      // Créer l'élément img et définir sa source
      const imageProjet = document.createElement("img");
      imageProjet.src = projet[i].imageUrl;

      // Créer l'élément figcaption et définir son texte
      const figcaption = document.createElement("figcaption");
      figcaption.innerText = projet[i].title;

      // Ajouter img et figcaption à figure
      figure.appendChild(imageProjet);
      figure.appendChild(figcaption);

      // Ajouter figure à la galerie
      gallery.appendChild(figure);
    }
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des projets :', error);
  });

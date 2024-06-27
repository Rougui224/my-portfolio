// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ********************* THEME *************************
  window.addEventListener("load", () => {
    // Vérifier si le thème sombre est déjà activé via le localStorage
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") == "claire") {
        modeClaire();
      }
    }
  });

  // les éléments du DOM
  const root = document.documentElement;
  const body = document.body;
  const toggleMode = document.querySelector(".header_toggleMode");
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");

  // les fonctions
  function modeSombre() {
    body.className = "mode-sombre";
    root.style.setProperty("--colorPrimaire", "black");
    root.style.setProperty("--colorQuaternaire", "#f33535");
    root.style.setProperty("--colorTertiaire", "#161515");
    root.style.setProperty("--colorSecondaire", "#d8e9f0");
    root.style.setProperty("--shadow", "rgba(112, 112, 112, 0.52)");
    moon.style.display = "none";
    sun.style.display = "block";
    localStorage.setItem("theme", "sombre");
  }

  function modeClaire() {
    body.className = "";
    root.style.setProperty("--colorPrimaire", "#d2d2d22e");
    root.style.setProperty("--colorQuaternaire", "#f33535");
    root.style.setProperty("--colorTertiaire", "white");
    root.style.setProperty("--colorSecondaire", "black");
    root.style.setProperty("--shadow", "rgba(0, 0, 0, 0.15)");
    sun.style.display = "none";
    moon.style.display = "block";
  }

  function gerertheme() {
    // Mettre à jour les variables CSS en fonction du thème choisi
    if (body.classList.contains("mode-sombre")) {
      modeClaire();
      localStorage.setItem("theme", "claire");
    } else {
      modeSombre();
    }
  }

  toggleMode.addEventListener("click", gerertheme);

  // *************** NAVIGATION DESKTOP******************

  // Sélectionne toutes les sections et la section home
  const sections = document.querySelectorAll("main > section, .home");
  // Sélectionne tous les liens de navigation
  const navLinks = document.querySelectorAll(".header_navigation a");

  // Initialise la position de défilement précédente
  let index = 0,
    lastScrollY;
  let isDeleting = false;

  // Fonction pour mettre à jour le lien actif en fonction de la position de défilement
  const updateActiveLink = () => {
    // Initialise l'index à la longueur des sections
    let index = sections.length;

    // Trouve la section active en comparant la position de défilement
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

    // Supprime la classe active de tous les liens de navigation
    navLinks.forEach((link) => link.classList.remove("active"));
    // Ajoute la classe active au lien correspondant à la section active
    navLinks[index].classList.add("active");
  };
  // Écouteur d'événement de défilement
  window.addEventListener("scroll", () => {
    // Met à jour la dernière position de défilement
    lastScrollY = window.scrollY;

    // Met à jour le lien actif
    updateActiveLink();
  });

  // *************** NAVIGATION MOBILE******************

  // Sélectionne tous les liens de navigation mobile
  const menuLinks = document.querySelectorAll(".menu_navigation a");
  const menuIcon = document.getElementById("menu-icon");
  const modalMenu = document.getElementById("modal-menu");
  const closeModal = document.getElementById("close-modal");

  // fonctions
  function toggleModal(
    element1,
    element2,
    element3,
    display = "none",
    display2 = "none"
  ) {
    element1.style.display = "none";
    element2.style.display = display;
    element3.style.display = display2;
  }
  // Fonction pour vérifier la largeur de l'écran et masquer/afficher l'icône
  function checkScreenWidth() {
    if (window.innerWidth >= 767) {
      toggleModal(menuIcon, modalMenu, closeModal, "none", "none");
    } else {
      menuIcon.style.display = "block";
    }
  }
  // Fermer le menu modale
  closeModal.addEventListener("click", () =>
    toggleModal(modalMenu, closeModal, menuIcon, "none", "block")
  );

  // Ouvrir le menu modale
  menuIcon.addEventListener("click", () =>
    toggleModal(menuIcon, modalMenu, closeModal, "block", "block")
  );
  // Fermer le menu modale pour masquer le menu quand on clique sur un lien
  menuLinks.forEach((link) => {
    link.addEventListener("click", () =>
      toggleModal(modalMenu, closeModal, menuIcon, "none", "block")
    );
  });

  // Écouter les changements de taille de la fenêtre
  window.addEventListener("resize", checkScreenWidth);
  // Fermer le menu modale quand on clique à l'extérieur de celui-ci
  window.onclick = function (event) {
    if (event.target == modalMenu) {
      toggleModal(modalMenu, closeModal, menuIcon, "none", "block");
    }
  };

  // ***************** Animation de la page d'accueil *******************

  // DOM
  const homeSection = document.querySelector(".home");
  // Ajoutez la classe 'animate' pour déclencher l'animation
  setTimeout(() => {
    homeSection.classList.add("animate");
  }, 300); // délai pour s'assurer que les éléments sont prêts

  // ***********Animation du texte "Développeuse front-end" *************
  const textElement = document.querySelector(".animated-text");
  const text = textElement.getAttribute("data-text");

  function typeEffect() {
    if (!isDeleting) {
      // Écriture du texte
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100); // la vitesse de l'écriture ici
      } else {
        // Commencer à effacer après une pause
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 1000);
      }
    } else {
      // Effacement du texte
      if (index > 0) {
        textElement.textContent = text.substring(0, index - 1);
        index--;
        setTimeout(typeEffect, 100); // Ajuster la vitesse de l'effacement ici
      } else {
        // Recommencer à écrire après une pause
        isDeleting = false;
        setTimeout(typeEffect, 1000);
      }
    }
  }
  // ****************** Title hover  dans la section des compétences *************
  // Sélectionner toutes les images
  const images = document.querySelectorAll(".skill img");

  // Fonction pour afficher l'infobulle
  function showTooltip(event) {
    // Supprimer l'infobulle si elle existe déjà
    const prevtooltip = document.querySelector(".tooltip");
    // Si une infobulle est trouvée, la supprimer du DOM
    if (prevtooltip) {
      prevtooltip.remove();
    }

    // Obtenir le texte de l'infobulle à partir de l'attribut data-title
    const title = event.target.getAttribute("data-title");
    if (!title) return; // Si aucun titre n'est trouvé, arrêter la fonction

    // Créer un élément div pour l'infobulle
    let tooltip = document.createElement("div");
    tooltip.className = "tooltip"; // Ajouter la classe tooltip pour le style
    tooltip.innerText = title; // Définir le texte de l'infobulle
    // Ajouter l'infobulle au parent de l'image
    const parent = event.target.parentElement;
    parent.appendChild(tooltip);

    // Afficher l'infobulle
    tooltip.style.display = "block";
  }

  // Fonction pour cacher l'infobulle
  function hideTooltip() {
    // Sélectionner l'infobulle
    const tooltip = document.querySelector(".tooltip");
    // Si une infobulle est trouvée, la supprimer du DOM
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Ajouter des écouteurs d'événements pour chaque image
  images.forEach((img) => {
    img.addEventListener("mouseover", showTooltip); // Afficher l'infobulle lors du survol
    img.addEventListener("mouseout", hideTooltip); // Cacher l'infobulle lorsque la souris quitte l'image
  });

  // Met à jour le lien actif lors du chargement initial
  updateActiveLink();
  // Vérifie la largeur du width pour afficher/cacher le menu mobile
  checkScreenWidth();
  // Déclanche l'animation de l'écriture
  setTimeout(typeEffect, 1500);
});

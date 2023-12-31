// Fonction pour modifier la navigation en mode responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Sélection des éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Fonction pour déclencher l'ouverture de la modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction pour afficher la modal
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction pour fermer la modal
function closeModal() {
  modalbg.style.display = "none";
}

// Fonction de validation des champs de texte
function validateTextInput(inputElement, errorMessage) {
  console.log(errorMessage);
  const inputValue = inputElement.value;
  if (inputValue === "" || inputValue.length < 2) {
    displayError(inputElement, errorMessage);

    return false;
  }
  return true;
}

// Fonction de validation de l'adresse email
function validateEmail(email) {
  // Utilisez une regex pour vérifier la validité de l'e-mail
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Fonction de validation de la date de naissance
function validateBirthdate() {
  const birthdateInput = document.getElementById("birthdate");
  const birthdateValue = birthdateInput.value;
  if (birthdateValue === "") {
    return false;
  }

  // Créer un objet Date à partir de la valeur du champ de date de naissance
  const birthdateDate = new Date(birthdateValue);

  // Vérifier si la date de naissance est valide
  if (isNaN(birthdateDate.getTime())) {
    return false;
  }

  // Récupérer la date actuelle
  const currentDate = new Date();
  if (birthdateDate >= currentDate) {
    return false;
  }
  // Vérifier si la personne est née avant 2006
  const yearOfBirth = birthdateDate.getFullYear();
  if (yearOfBirth >= 2006 || yearOfBirth < 1920) {
    return false;
  }
  return true; // La date de naissance est conforme
}

//fonction pour effacer les erreur d'un champs donne
function clearErrorForField(event) {
  // Obtenir le champ associé à l'événement
  let inputElement = event.target;

  // Trouver le message d'erreur associé à ce champ (s'il existe)
  let errorElement = inputElement.parentNode.querySelector(".error-message");

  // Si un message d'erreur existe, supprimer
  if (errorElement) {
    errorElement.parentNode.removeChild(errorElement);

    // Réinitialiser la bordure à sa valeur par défaut
    inputElement.style.border = "";
  }
}
const form = document.querySelector("form");

// Quand on submit empeche le rechargement de la page
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
  console.log("Il n’y a pas eu de rechargement de page");
});

// Fonction pour afficher un message d'erreur
function displayError(inputElement, errorMessage) {
  // Crée un élément span pour afficher l'erreur
  let errorElement = document.createElement("span");
  errorElement.className = "error-message";
  errorElement.innerHTML = errorMessage;
  // Ajoute l'élément span après l'élément d'entrée
  inputElement.parentNode.appendChild(errorElement);
}

// Supprime tous les messages d'erreur
function clearErrors() {
  let errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function (errorMessage) {
    errorMessage.parentNode.removeChild(errorMessage);
  });
}

// Fonction de validation du formulaire
function validate() {
  // Réinitialiser les messages d'erreur
  clearErrors();

  // Récupération des champs du formulaire
  let firstNameInput = document.getElementById("first");
  let lastNameInput = document.getElementById("last");
  let emailInput = document.getElementById("email");
  let quantityInput = document.getElementById("quantity");
  let locationInputs = document.querySelectorAll('input[name="location"]');
  let checkbox1Input = document.getElementById("checkbox1");
  let birthdateInput = document.getElementById("birthdate");

  // Suppression des espaces inutiles des valeurs des champs
  let firstName = firstNameInput.value.trim();
  let lastName = lastNameInput.value.trim();
  let email = emailInput.value.trim();
  let quantity = quantityInput.value.trim();
  let birthdate = birthdateInput.value;

  // Ajout des gestionnaires d'événements input pour effacer les erreurs
  firstNameInput.addEventListener("input", clearErrorForField);
  lastNameInput.addEventListener("input", clearErrorForField);
  emailInput.addEventListener("input", clearErrorForField);
  quantityInput.addEventListener("input", clearErrorForField);
  checkbox1Input.addEventListener("input", clearErrorForField);
  birthdateInput.addEventListener("input", clearErrorForField);
  // Pour les éléments de la liste des villes
  locationInputs.forEach((locationInput) => {
    locationInput.addEventListener("input", clearErrorForField);
  });

  let isValid = true;
  let errorMessageText = "Veuillez entrer 2 caractères ou plus pour le prénom.";

  //valider le prénom
  if (
    !validateTextInput(
      firstNameInput,
      "Veuillez entrer 2 caractères ou plus pour le prénom."
    )
  ) {
    let textControlPrenom = document.querySelector(".text-control-prenom");
    textControlPrenom.style.border = "3px solid red";

    isValid = false;
  }

  // valider le nom
  if (
    !validateTextInput(
      lastNameInput,
      "Veuillez entrer 2 caractères ou plus pour le nom."
    )
  ) {
    let textControlNom = document.querySelector(".text-control-nom");
    textControlNom.style.border = "3px solid red";
    isValid = false;
  }

  //valider email
  if (!validateEmail(email)) {
    displayError(emailInput, "Veuillez entrer une adresse e-mail valide.");
    isValid = false;
    let textControlEmail = document.querySelector(".text-control-email");
    textControlEmail.style.border = "3px solid red";
  }

  // Validation de la date de naissance
  if (!validateBirthdate(birthdate)) {
    displayError(
      birthdateInput,
      "Veuillez entrer une date de naissance valide ."
    );
    isValid = false;
    let textControlBirthdate = document.querySelector(
      ".text-control-birthdate"
    );
    textControlBirthdate.style.border = "3px solid red";
  }

  // Validation du nombre de tournois
  if (quantity === "" || isNaN(quantity)) {
    displayError(quantityInput, "Veuillez entrer un nombre valide.");
    isValid = false;
    let textControlQuantity = document.querySelector(".text-control-quantity");
    textControlQuantity.style.border = "3px solid red";
  }

  // Validation du choix de la ville
  let locationSelected = false;
  locationInputs.forEach(function (locationInput) {
    if (locationInput.checked) {
      locationSelected = true;
    }
  });

  if (!locationSelected) {
    displayError(locationInputs[0], "Vous devez choisir une option.");
    isValid = false;
  }

  // Validation de l'acceptation des termes et conditions
  if (!checkbox1Input.checked) {
    displayError(
      checkbox1Input,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    isValid = false;
  }

  //si tout est valide
  if (isValid) {
    // Validation réussie, afficher un message de confirmation
    let confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.style.display = "block";

    // Cacher le formulaire
    let form = document.getElementById("reserve-form");
    form.style.display = "none";

    return false; // Empêche la soumission du formulaire
  }

  return isValid;
}

// j'ajoute un gestionnaire d'événements au bouton "Fermer"
const closeButton = document.getElementById("close-button");

if (closeButton) {
  closeButton.addEventListener("click", function () {
    closeModal();
  });
}

// je sélectionne la croix par son identifiant
const closeIcon = document.getElementById("close-modal");

// Vérifiez si l'élément a été trouvé
if (closeIcon) {
  // Ajoutez un gestionnaire d'événements pour le clic
  closeIcon.addEventListener("click", function () {
    // Masquez la fenêtre modale
    const modalbg = document.querySelector(".bground");
    if (modalbg) {
      modalbg.style.display = "none";
    }
  });
}

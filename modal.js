function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

//*********DECLENCHE LA MODAL***********
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//***************AFFICHE LE FORMULAIRE MODAL*******************************
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//********************FONCTION FERME LA MODAL****************
function closeModal() {
  modalbg.style.display = "none";
}

//*******************FONCTION DE VALIDATION DES CHAMPS TEXTES**************
function validateTextInput(inputElement, errorMessage) {
  console.log(errorMessage);
  const inputValue = inputElement.value;
  if (inputValue === "" || inputValue.length < 2) {
    displayError(inputElement, errorMessage);

    return false;
  }
  return true;
}

//******************FONCTION VALIDATION CHAMPS EMAIL**************************
function validateEmail(email) {
  // Utilisez une regex pour vérifier la validité de l'e-mail
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

//***************FONCTION POUR EFFACER LES ERREURS D'UN CHAMPS DONNE****************
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

//****** */ Quand on submit empeche le rechargement de la page******************
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
  console.log("Il n’y a pas eu de rechargement de page");
});

//************FORMULAIRE VALIDATION********* */
function validate() {
  //***************VARIABLES********************* */
  //RECUPERATION DES CHAMPS

  let firstNameInput = document.getElementById("first");
  let lastNameInput = document.getElementById("last");
  let emailInput = document.getElementById("email");
  let quantityInput = document.getElementById("quantity");
  let locationInputs = document.querySelectorAll('input[name="location"]');
  let checkbox1Input = document.getElementById("checkbox1");

  //**********************SUPPRESSION DES ESPACES INUTILES****************************************
  let firstName = firstNameInput.value.trim();
  let lastName = lastNameInput.value.trim();
  let email = emailInput.value.trim();
  let quantity = quantityInput.value.trim();

  // Réinitialiser les messages d'erreur
  clearErrors();

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

  //*****je valide l'email********* */
  if (!validateEmail(email)) {
    displayError(emailInput, "Veuillez entrer une adresse e-mail valide.");
    isValid = false;
    let textControlEmail = document.querySelector(".text-control-email");
    textControlEmail.style.border = "3px solid red";
  }
  //*************je valide le nombre de tournois****************** */
  if (quantity === "" || isNaN(quantity)) {
    displayError(quantityInput, "Veuillez entrer un nombre valide.");
    isValid = false;
    let textControlQuantity = document.querySelector(".text-control-quantity");
    textControlQuantity.style.border = "3px solid red";
  }
  //*********************je valide le choix********************** */
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
  //**************je verifie les terme premiere cas cochee******************** */
  if (!checkbox1Input.checked) {
    displayError(
      checkbox1Input,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    isValid = false;
  }

  //**** */ Ajoutez des gestionnaires d'événements input à vos champs de formulaire efface les erreur****
  firstNameInput.addEventListener("input", clearErrorForField);
  lastNameInput.addEventListener("input", clearErrorForField);
  emailInput.addEventListener("input", clearErrorForField);
  quantityInput.addEventListener("input", clearErrorForField);
  checkbox1Input.addEventListener("input", clearErrorForField);

  // Pour les éléments de la liste des villes

  locationInputs.forEach((locationInput) => {
    locationInput.addEventListener("input", clearErrorForField);
  });

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

function displayError(inputElement, errorMessage) {
  // Crée un élément span pour afficher l'erreur
  let errorElement = document.createElement("span");
  errorElement.className = "error-message";
  errorElement.innerHTML = errorMessage;

  // Ajoute l'élément span après l'élément d'entrée
  inputElement.parentNode.appendChild(errorElement);
}

function clearErrors() {
  // Supprime tous les messages d'erreur
  let errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function (errorMessage) {
    errorMessage.parentNode.removeChild(errorMessage);
  });
}
// j'joute un gestionnaire d'événements au bouton "Fermer"
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

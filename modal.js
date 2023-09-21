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
    isValid = false;
  }

  // valider le nom
  if (
    !validateTextInput(
      lastNameInput,
      "Veuillez entrer 2 caractères ou plus pour le nom."
    )
  ) {
    isValid = false;
  }

//*****je valide l'email********* */
  if (!validateEmail(email)) {
    displayError(emailInput, "Veuillez entrer une adresse e-mail valide.");
    isValid = false;
  }

  if (quantity === "" || isNaN(quantity)) {
    displayError(quantityInput, "Veuillez entrer un nombre valide.");
    isValid = false;
  }

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

  if (!checkbox1Input.checked) {
    displayError(
      checkbox1Input,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    isValid = false;
  }

  // Ajoutez des gestionnaires d'événements input à vos champs de formulaire
  firstNameInput.addEventListener("input", clearErrorForField);
  lastNameInput.addEventListener("input", clearErrorForField);
  emailInput.addEventListener("input", clearErrorForField);
  quantityInput.addEventListener("input", clearErrorForField);
  checkbox1Input.addEventListener("input", clearErrorForField);

  // Pour les éléments de la liste des villes

  locationInputs.forEach((locationInput) => {
    locationInput.addEventListener("input", clearErrorForField);
  });

  // La fonction pour effacer les messages d'erreur pour un champ donné

  function clearErrorForField(event) {
    // Obtenir le champ associé à l'événement
    let inputElement = event.target;

    // je trouve le message d'erreur associé à ce champ (s'il existe)
    let errorElement = inputElement.parentNode.querySelector(".error-message");

    // Si un message d'erreur existe, supprime
    if (errorElement) {
      errorElement.parentNode.removeChild(errorElement);
    }
  }
  function hideConfirmationMessage() {
    console.log("hideConfirmationMessage");
    let confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.style.display = "none";
  }

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
const form = document.querySelector("form");

// Quand on submit
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
  console.log("Il n’y a pas eu de rechargement de page");
});

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

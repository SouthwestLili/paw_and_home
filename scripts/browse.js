const shelterSelect = document.getElementById("shelter");
const content = document.getElementById("browse-content");
const filters = document.getElementById("pet-types");
const petsContainer = document.getElementById("pets");
const categories = ["All", "Cats", "Dogs", "Birds", "Reptiles", "Other"];
let selectedShelter = null;
let selectedType = "All";

// Convert a pet type into the filter label used by the page.
function categoryOf(pet) {
  if (pet.type === "Cat") return "Cats";
  if (pet.type === "Dog") return "Dogs";
  if (pet.type === "Bird" || pet.type === "Parrot") return "Birds";
  if (pet.type === "Reptile") return "Reptiles";
  return "Other";
}

// Add each shelter to the dropdown menu.
for (let i = 0; i < shelters.length; i++) {
  const option = document.createElement("option");
  option.value = shelters[i].id;
  option.textContent = shelters[i].name;
  shelterSelect.appendChild(option);
}

// Show all pet cards for the selected shelter and current filter.
function renderPets() {
  petsContainer.textContent = "";
  for (let i = 0; i < selectedShelter.pets.length; i++) {
    const pet = selectedShelter.pets[i];
    if (selectedType === "All" || categoryOf(pet) === selectedType) {
      const card = document.createElement("div");
      card.className = "pet-card";
      const image = document.createElement("img");
      image.src = pet.image;
      image.alt = pet.name;
      const name = document.createElement("h2");
      name.textContent = pet.name;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "View Details";
      button.addEventListener("click", function () {
        window.location.href =
          "pet.html?id=" +
          encodeURIComponent(pet.id) +
          "&shelter=" +
          encodeURIComponent(selectedShelter.id);
      });
      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(button);
      petsContainer.appendChild(card);
    }
  }
}

// Rebuild the filter buttons to match the currently selected shelter.
function renderFilters() {
  filters.textContent = "";
  for (let i = 0; i < categories.length; i++) {
    const type = categories[i];
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = type;

    let hasPets = false;
    if (type === "All") hasPets = true;
    for (let j = 0; j < selectedShelter.pets.length; j++) {
      if (categoryOf(selectedShelter.pets[j]) === type) hasPets = true;
    }
    button.disabled = !hasPets;
    if (type === selectedType) button.className = "selected";
    button.addEventListener("click", function () {
      selectedType = type;
      renderFilters();
      renderPets();
    });
    filters.appendChild(button);
  }
}

// Update the visible pet list when the user changes the shelter.
function selectShelter() {
  selectedShelter = null;
  for (let i = 0; i < shelters.length; i++) {
    if (shelters[i].id === shelterSelect.value) selectedShelter = shelters[i];
  }
  selectedType = "All";
  filters.textContent = "";
  petsContainer.textContent = "";
  if (selectedShelter === null) {
    content.hidden = true;
  } else {
    content.hidden = false;
    renderFilters();
    renderPets();
  }
}

shelterSelect.addEventListener("change", selectShelter);
// Restore the shelter when returning from the pet details page.
const params = new URLSearchParams(window.location.search);
const incomingShelter = params.get("shelter");
for (let i = 0; i < shelters.length; i++) {
  if (shelters[i].id === incomingShelter) shelterSelect.value = incomingShelter;
}
selectShelter();

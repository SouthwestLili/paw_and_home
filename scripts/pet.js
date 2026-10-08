// Get the pet id and shelter id passed in the page URL.
const params = new URLSearchParams(window.location.search);
let shelter = null;
let pet = null;

for (let i = 0; i < shelters.length; i++) {
  if (shelters[i].id === params.get("shelter")) {
    shelter = shelters[i];
    break;
  }
}

if (shelter !== null) {
  for (let i = 0; i < shelter.pets.length; i++) {
    if (shelter.pets[i].id === params.get("id")) {
      pet = shelter.pets[i];
    }
  }
}

const details = document.getElementById("pet-details");

// Small helper to add a paragraph to a parent element.
function paragraph(parent, text) {
  const element = document.createElement("p");
  element.textContent = text;
  parent.appendChild(element);
}

if (!pet) {
  paragraph(details, "Please select a pet from Browse Pets.");
} else {
  // Go back to the shelter's pet list.
  document.getElementById("back").href =
    "browse.html?shelter=" + encodeURIComponent(shelter.id);

  // Create the main layout for the pet details page.
  const layout = document.createElement("div");
  layout.className = "pet-layout";
  const image = document.createElement("img");
  image.className = "pet-image";
  image.src = pet.image;
  image.alt = pet.name;
  const text = document.createElement("div");
  text.className = "pet-text";
  const name = document.createElement("h1");
  name.textContent = pet.name;
  text.appendChild(name);
  paragraph(text, pet.age + " year old " + pet.breed + " (" + pet.type + ")");
  paragraph(text, "Health: " + pet.health);
  const traitsHeading = document.createElement("h2");
  traitsHeading.textContent = "Traits";
  text.appendChild(traitsHeading);

  const traits = document.createElement("ul");
  for (let i = 0; i < pet.traits.length; i++) {
    const li = document.createElement("li");
    li.textContent = pet.traits[i];
    traits.appendChild(li);
  }
  text.appendChild(traits);

  paragraph(text, "Days at shelter: " + pet.daysAtShelter);
  const fees = document.createElement("div");
  fees.className = "fees";
  paragraph(fees, "Adoption fee: $" + pet.adoptionFee.toFixed(2));
  paragraph(fees, "Processing fee: $" + shelter.processingFee.toFixed(2));
  paragraph(
    fees,
    "Total (before taxes): $" +
      (pet.adoptionFee + shelter.processingFee).toFixed(2),
  );

  const applyButton = document.createElement("button");
  applyButton.type = "button";
  applyButton.textContent = "Apply to Adopt this Pet";

  applyButton.addEventListener("click", function () {
    window.location.href =
      "apply.html?petId=" +
      encodeURIComponent(pet.id) +
      "&petName=" +
      encodeURIComponent(pet.name) +
      "&petType=" +
      encodeURIComponent(pet.type) +
      "&petBreed=" +
      encodeURIComponent(pet.breed) +
      "&adoptionFee=" +
      pet.adoptionFee +
      "&processingFee=" +
      shelter.processingFee;
  });

  fees.appendChild(applyButton);
  text.appendChild(fees);
  layout.appendChild(image);
  layout.appendChild(text);
  details.appendChild(layout);
}

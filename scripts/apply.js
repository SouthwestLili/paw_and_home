// Read values passed from the pet details page.
const params = new URLSearchParams(window.location.search);
const form = document.getElementById("application");
const summary = document.getElementById("pet-information");
const adoptionFee = Number(params.get("adoptionFee"));
const processingFee = Number(params.get("processingFee"));

// Make sure all required pet data is present and valid before showing the summary.
const validPet =
  params.get("petId") !== null &&
  params.get("petName") !== null &&
  params.get("petType") !== null &&
  params.get("petBreed") !== null &&
  params.get("adoptionFee") !== null &&
  params.get("processingFee") !== null &&
  !isNaN(adoptionFee) &&
  !isNaN(processingFee);

// Create a small helper to add a text element to a parent node.
function addText(parent, tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  parent.appendChild(element);
}

if (validPet) {
  addText(summary, "h2", params.get("petName"));
  addText(summary, "p", params.get("petType") + " — " + params.get("petBreed"));
  addText(summary, "p", "Adoption fee: $" + adoptionFee.toFixed(2));
  addText(summary, "p", "Processing fee: $" + processingFee.toFixed(2));
  addText(
    summary,
    "p",
    "Total (before taxes): $" + (adoptionFee + processingFee).toFixed(2),
  );
} else {
  form.textContent = "";
  addText(form, "p", "Please select a pet from Browse Pets before applying.");
  const browse = document.createElement("a");
  browse.href = "browse.html";
  browse.textContent = "Browse Pets";
  form.appendChild(browse);
}

// If the pet is valid, add the application form.
if (validPet) {
  const care = document.getElementById("care");
  const understand = document.getElementById("understand");
  const submit = document.getElementById("submit");

  function updateSubmit() {
    submit.disabled = !(care.checked && understand.checked);
  }

  care.addEventListener("change", updateSubmit);
  understand.addEventListener("change", updateSubmit);
  updateSubmit();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!care.checked || !understand.checked) return;
    const message = document.createElement("section");
    message.className = "panel";
    addText(message, "h1", "Application submitted successfully!");
    addText(
      message,
      "p",
      "Thank you for applying to adopt " +
        params.get("petName") +
        ". Your application will be reviewed, and we will contact you soon.",
    );

    const home = document.createElement("button");
    home.type = "button";
    home.textContent = "Return to Home";

    home.addEventListener("click", function () {
      window.location.href = "index.html";
    });
    message.appendChild(home);
    form.parentNode.replaceChild(message, form);
  });
}

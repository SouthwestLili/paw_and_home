// Load the mission paragraph from aboutData.js.
document.getElementById("mission").textContent = aboutData.mission;

// Load the team description from aboutData.js.
document.getElementById("team-description").textContent =
  aboutData.teamDescription;

// Get the container where all team cards will be added.
const teamContainer = document.getElementById("team");

// Create one card for each team member and add it to the page.
for (let i = 0; i < aboutData.team.length; i++) {
  const member = aboutData.team[i];
  const card = document.createElement("div");
  card.className = "team-card";

  const name = document.createElement("h3");
  name.textContent = member.name;

  const role = document.createElement("p");
  role.textContent = member.role;

  const experience = document.createElement("p");
  experience.textContent = member.experience;

  const qualifications = document.createElement("p");
  qualifications.textContent = member.qualifications;

  card.appendChild(name);
  card.appendChild(role);
  card.appendChild(experience);
  card.appendChild(qualifications);
  teamContainer.appendChild(card);
}

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // THEME MANAGEMENT (STATE)
  // =========================
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  });

  // =========================
  // USERNAME (STATE)
  // =========================
  const nameInput = document.getElementById("name-input");
  const greeting = document.getElementById("greeting");
  const savedName = localStorage.getItem("username");

  if (savedName) {
    greeting.textContent = `Welcome back, ${savedName}!`;
  }

  if (nameInput) {
    nameInput.addEventListener("change", () => {
      const name = nameInput.value.trim();
      if (!name) return;
      localStorage.setItem("username", name);
      greeting.textContent = `Hello, ${name}!`;
    });
  }

  // =========================
  // GITHUB API + PROJECTS
  // =========================
  let repos = [];

  async function loadRepos() {
    try {
      const response = await fetch(
        "https://api.github.com/users/ZahraMahdi32/repos?sort=created&per_page=20"
      );

      if (!response.ok) throw new Error("Network response was not ok");

      repos = await response.json();
      renderProjects(repos);
    } catch (error) {
      const errorEl = document.getElementById("projects-error");
      if (errorEl) {
        errorEl.textContent = "Failed to load repositories. Please try again.";
        errorEl.classList.remove("hidden");
      }
      console.error(error);
    }
  }

  loadRepos();

  function renderProjects(list) {
    const container = document.getElementById("projects-list");
    if (!container) return;

    container.innerHTML = "";

    list.forEach((repo) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || ""}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      `;

      container.appendChild(card);
    });
  }

  // =========================
  // SORTING (LOGIC)
  // =========================
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      const value = event.target.value;

      const sorted = [...repos].sort((a, b) => {
        if (value === "newest") {
          return new Date(b.created_at) - new Date(a.created_at);
        } else {
          return new Date(a.created_at) - new Date(b.created_at);
        }
      });

      renderProjects(sorted);
    });
  }

  // =========================
  // FILTERING
  // =========================
  const filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      if (filter === "all") {
        renderProjects(repos);
      } else {
        const filtered = repos.filter((repo) =>
          repo.name.toLowerCase().includes(filter.toLowerCase())
        );
        renderProjects(filtered);
      }
    });
  });

  // =========================
  // CONTACT FORM + EMAILJS
  // =========================
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const form = document.getElementById("contact-form");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      let valid = true;

      // Validate email
      if (!email.value || !email.value.includes("@")) {
        emailError.textContent = "Please enter a valid email.";
        valid = false;
      } else {
        emailError.textContent = "";
      }

      // Validate message
      if (!message.value || message.value.trim().length < 3) {
        messageError.textContent = "Message must be at least 3 characters.";
        valid = false;
      } else {
        messageError.textContent = "";
      }

      if (!valid) return;

      // If valid → send email
      const status = document.getElementById("status-msg");

      emailjs.init("HpgPMW3tLQAZqRhHo"); // PUBLIC KEY

      try {
        await emailjs.send("service_6vz0m7p", "template_w68rgt1", {
          from_email: email.value,
          message: message.value,
          to_name: "Zahra",
        });

        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        form.reset();

      } catch (err) {
        status.textContent = "Failed to send message. Please try again.";
        status.style.color = "red";
        console.error("EmailJS Error:", err);
      }
    });
  }

  // =========================
  // BACK TO TOP BUTTON
  // =========================
  const backToTopBtn = document.getElementById("back-to-top");

  function handleScroll() {
    if (!backToTopBtn) return;
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", handleScroll);

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// =========================
// FPGA MODAL
// =========================
function openReactionModal() {
  document.getElementById("reaction-modal").classList.remove("hidden");
}

function closeReactionModal() {
  document.getElementById("reaction-modal").classList.add("hidden");
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("reaction-modal");
  if (e.target === modal) modal.classList.add("hidden");
});

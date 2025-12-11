# Technical Documentation

## Overview
This project is a fully functional personal portfolio website created as part of Assignment 4.  
It demonstrates advanced front-end development concepts including:
- Theme management with persistent state  
- Username personalization using localStorage  
- Fetching GitHub repositories through the GitHub REST API  
- Sorting and filtering logic  
- Contact form validation and EmailJS integration  
- Modal component for FPGA project details  
- Responsive styling and custom UI theme  

---

## File Structure

```
index.html
css/
  styles.css
js/
  script.js
assets/
  images/
docs/
  technical-documentation.md
  ai-usage-report.md
README.md
```

---

## index.html
Defines the main structure of the portfolio:
- Header with theme toggle
- Hero section with greeting + stored username
- About section
- Skills section
- Featured projects (including FPGA modal)
- Dynamic GitHub projects loaded via API
- Contact form with EmailJS integration
- Back-to-top button

---

## styles.css
Contains:
- Full light/dark theme using CSS variables  
- Custom purple/pink portfolio theme  
- Layout styling for all sections  
- Responsive design rules  
- Modal styling for the FPGA project  
- Utility classes (hidden, transitions, etc.)

---

## script.js
Implements all functionality:

### 1. Theme Management
Stores theme preference in localStorage:
```js
localStorage.setItem("theme", currentTheme);
document.body.setAttribute("data-theme", savedTheme);
```

### 2. Username Persistence
```js
localStorage.setItem("username", name);
greeting.textContent = `Hello, ${name}!`;
```

### 3. Load GitHub Repositories
```js
fetch("https://api.github.com/users/ZahraMahdi32/repos?sort=created&per_page=20")
  .then(res => res.json())
  .then(data => renderProjects(data));
```

### 4. Sorting Logic
Sort by newest/oldest:
```js
const sorted = [...repos].sort((a, b) =>
  value === "newest"
    ? new Date(b.created_at) - new Date(a.created_at)
    : new Date(a.created_at) - new Date(b.created_at)
);
```

### 5. Filtering
```js
repos.filter(repo =>
  repo.name.toLowerCase().includes(filter.toLowerCase())
);
```

### 6. Contact Form + EmailJS
```js
emailjs.init("HpgPMW3tLQAZqRhHo");

emailjs.send("service_6vz0m7p", "template_w68rgt1", {
  from_email: email.value,
  message: message.value,
  to_name: "Zahra",
});
```

### 7. FPGA Modal
```js
function openReactionModal() {
  document.getElementById("reaction-modal").classList.remove("hidden");
}
function closeReactionModal() {
  document.getElementById("reaction-modal").classList.add("hidden");
}
```

### 8. Back to Top Button
Appears only when scrolling down:
```js
window.scrollTo({ top: 0, behavior: "smooth" });
```

---

## API Used
The project uses the GitHub REST API:
```js
fetch("https://api.github.com/users/ZahraMahdi32/repos?sort=created&per_page=20");
```

---

## Advanced Features Implemented
- API Integration (GitHub)
- State Management with localStorage
- Custom dark/light/purple theme
- Modal component
- Sorting + filtering logic
- Form validation + EmailJS connection
- Dynamic DOM rendering
- Responsive layout

---

## Conclusion
This portfolio demonstrates practical use of JavaScript, asynchronous APIs, DOM manipulation, responsive design, and UI/UX thinking.  
It fulfills all assignment requirements: API usage, sorting/filtering logic, error handling, state management, and a custom creative feature.

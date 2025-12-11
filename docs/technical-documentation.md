# Technical Documentation

## Overview
This project is a simple portfolio page extended to meet the requirements of an "Advanced Functionality" assignment. It demonstrates:
- API integration (GitHub API)
- State management (theme and username)
- Complex logic (sorting/filtering and form validation)
- Basic performance considerations

---

## File Structure

- `index.html`  
  Main HTML document that defines the layout and includes:
  - Header with title and theme toggle button
  - Hero section with greeting and name input
  - Projects section where GitHub repositories are listed
  - Contact section with a form and validation messages

- `css/styles.css`  
  Contains all styling for the layout, including:
  - Light and dark theme styles
  - Grid layout for the projects section
  - Basic form styling and error message styles

- `js/script.js`  
  Main JavaScript file that implements:
  - Theme management via `localStorage`
  - Storing and loading username via `localStorage`
  - Fetching repositories from the GitHub API
  - Rendering a list of repositories as cards
  - Sorting repositories by creation date
  - Basic filtering mechanism (by name/text)
  - Contact form validation logic

- `docs/ai-usage-report.md`  
  Describes how AI tools were used during development.

- `README.md`  
  High-level description of the project and how to run it.

---

## API Integration

The project uses the public GitHub REST API:

```js
fetch("https://api.github.com/users/octocat/repos?sort=created&per_page=20")

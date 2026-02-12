# Vedant Harish Bhavsar - ML/DS Portfolio

A premium, dark-themed, glassmorphism-styled portfolio website designed for a Machine Learning and Data Science enthusiast.

## Features
- **Modern Dark Theme**: Deep blue/black palette with glassmorphism effects.
- **Responsive Design**: Looks great on mobile, tablet, and desktop.
- **GitHub Integration**: Automatically fetches your latest repositories using the GitHub API.
- **Scroll Animations**: Smooth fade-in and slide-up animations as you scroll.
- **Interactive Elements**: Custom cursor and hover effects.

## Project Structure
- `index.html`: Main content structure.
- `style.css`: All styles, animations, and responsive rules.
- `script.js`: Interactivity, animations, and API integration.
- `assets/`: Folder for images and documents (Resume, OG Image).

## How to Run Locally
1. Simply double-click `index.html` to open it in your web browser.
2. OR, if you have VS Code with the "Live Server" extension, right-click `index.html` and select "Open with Live Server".

## Deployment to GitHub Pages
1. Push this folder to a GitHub repository (e.g., named `vedantbhavsar17.github.io` or just `portfolio`).
2. Go to the repository **Settings** > **Pages**.
3. Under **Source**, select `Deploy from a branch`.
4. Select `main` (or `master`) branch and `/root` folder.
5. Click **Save**.
6. Your site will be live in a few minutes!

## Customization
- **Resume**: Place your resume PDF in the `assets` folder and name it `resume.pdf`.
- **OG Image**: Place an image named `og-image.png` in the `assets` folder for social media previews.
- **Email Form**: The specific contact form backend (Formspree) needs a unique ID. Update the `action` attribute in the `<form>` tag in `index.html` with your own Formspree endpoint or similar service.

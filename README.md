# JoltCode – Online Code Editor

## Overview
**JoltCode** is a browser-based live code editor that allows users to write, edit, and preview **HTML**, **CSS**, and **JavaScript** code in real time.  
It is designed to provide a fast, minimal, and responsive environment for experimenting with front-end code, similar to platforms like CodePen or JSFiddle.

This project was developed primarily using **HTML**, **CSS**, and **JavaScript**, while leveraging a few open-source tools and frameworks to enhance user experience and performance.

---

## Features
- Separate panels for HTML, CSS, and JavaScript with real-time live preview.  
- Clean and minimal UI for distraction-free coding.  
- Adjustable and resizable editor panels for better workspace customization.  
- Syntax highlighting and intelligent code suggestions powered by **Monaco Editor**.  
- Auto-refresh on code changes with instant visual feedback.  
- Support for light and dark themes.  

---

## Project Structure
The project is organized into three main parts:

| Folder | Description |
|---------|-------------|
| **client/** | Contains the front-end code (HTML, CSS, JS, and UI components). |
| **server/** | Handles backend API routes and data management. |
| **shared/** | Defines shared utilities and schema models used across the app. |

---

## How It Works
1. Users can write HTML, CSS, and JavaScript code in separate panels.  
2. The code is instantly rendered in a live preview window.  
3. Monaco Editor provides code completion, syntax highlighting, and formatting.  
4. The workspace layout adapts to any screen size for responsive editing.  

---

## Technical Overview
- **Frontend:** Built with HTML, CSS, and JavaScript, enhanced with a modern UI framework.  
- **Editor Engine:** Uses **Monaco Editor**, the same code editor used in VS Code, for an improved coding experience.  
- **Preview System:** Injects user-written HTML, CSS, and JS into an isolated iframe for safe, live execution.  
- **Backend (Optional):** A simple Express.js server setup for saving and loading snippets (can be extended with a database).  

---

## Future Enhancements
- User authentication and personalized snippet saving.  
- Integration with GitHub Gists for sharing code.  
- Multi-theme support and customizable color schemes.  
- Collaboration mode for real-time pair programming.  

---

## Deployment
The app can be deployed easily using **Vercel**, **Netlify**, or any static hosting platform.  
For full-stack support, connect the backend API using **Express.js** or a serverless function.

---

## Acknowledgements
This project was developed independently as a learning and portfolio project.  
Special thanks to the open-source community behind **Monaco Editor** and front-end UI libraries that made this project possible.

##Author
Developed by Aditya Vana
Built with HTML, CSS, and JavaScript, powered by Monaco for a seamless coding experience.

# JoltCode – Live Online Code Editor

## Overview

JoltCode is a web-based live code editor that allows users to write, edit, and preview HTML, CSS, and JavaScript in real time directly in the browser.  
It is inspired by platforms like CodePen and JSFiddle but built from scratch with a minimal, distraction-free interface and smooth live preview functionality.

The editor provides three separate panels for HTML, CSS, and JavaScript, along with a real-time output preview.  
It is lightweight, responsive, and designed for quick experimentation and learning.

---

## Features

- Separate editors for HTML, CSS, and JavaScript  
- Real-time preview that updates instantly as you type  
- Adjustable panels for a personalized layout  
- Syntax highlighting powered by Monaco Editor (used in VS Code)  
- Options to save, reset, and share code snippets  
- Minimal and responsive design with light and dark mode  
- Runs entirely in the browser without additional setup

---

## Technologies Used

This project is primarily built using HTML, CSS, and JavaScript, with support from modern frameworks and tools for performance and UI enhancements.

- **Monaco Editor** – for syntax highlighting and intelligent editing  
- **Vite** – for fast development and bundling  
- **Tailwind CSS** – for responsive, utility-first styling  
- **React (light usage)** – for managing UI components and real-time updates  

The focus of JoltCode is simplicity, using core web technologies to bring live code editing directly to the browser.

---

## System Highlights

### Frontend
- Three code panels (HTML, CSS, JavaScript) with a live preview  
- Clean and responsive layout adaptable to all screen sizes  
- Debounced updates for smooth and efficient rendering  

### Backend (Optional)
- Basic REST API endpoints for saving and retrieving snippets  
- Configurable for database integration such as PostgreSQL for persistent storage  

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/aditya-vana/My.Slice.of.Life.git
2. Navigate to the project directory
bash
Copy code
cd My.Slice.of.Life
3. Install dependencies
bash
Copy code
npm install
4. Run the development server
bash
Copy code
npm run dev
Visit http://localhost:5173 in your browser to use the JoltCode editor.

Future Improvements
Add user authentication for saving personal snippets

Enable online sharing and collaboration features

Support custom themes and layout presets

Author
Developed by Aditya Vana
Built with HTML, CSS, and JavaScript, powered by Monaco for a seamless coding experience.

# Recipe Finder App

![Recipe Finder App](https://img.shields.io/badge/MVC-Architecture-blue.svg)
![Web Application](https://img.shields.io/badge/Web-Application-brightgreen.svg)
![API Integration](https://img.shields.io/badge/API-Integration-orange.svg)

---

## Project Overview

The **Cookify** is a web-based application that helps users discover recipes based on the ingredients they have. The app integrates with an external API to fetch recipes and stores user-specific data such as saved recipes and playlists in a local database. This hybrid approach ensures users have access to up-to-date recipe options while enjoying personalized features.

### **Objective**
To create a scalable and user-friendly recipe suggestion platform that promotes cooking at home, reduces food waste, and helps users discover new meal ideas using ingredients they already have.

---

## Features

- **Ingredient-Based Search**: Input the ingredients you have, and the app will provide recipe suggestions.
- **Dietary Filters**: Filter recipes based on dietary preferences (e.g., vegetarian, gluten-free).
- **Save Recipes**: Save your favorite recipes for quick access.
- **API Integration**: Real-time access to a large database of recipes through an external API.
- **Local Storage**: Save user-specific data (preferences, saved recipes) in a local database for easy retrieval.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap  
- **Backend**: Node.js, Express.js, EJS, 
- **External API**: Open AI API for recipe data and generation
- **Database**: MongoDB for local storage of user-specific data
- **Version Control**: Git and GitHub for project management
- **User Authntication**: Passport.js

---

## Project Architecture
This project follows the Model-View-Controller (MVC) architecture:

- Model: Manages the database for user-specific data (e.g., saved recipes, preferences).
- View: Provides the user interface where users interact (ingredient input, recipe suggestions).
- Controller: Manages the interactions between the Model and the View, handling API requests and database queries.

---

## Design Considerations
This project incorporates several key design considerations:

- Economic Factors: Cost-effective hosting solutions and reliance on free-tier API services to minimize development and maintenance costs.
- Sustainability: Encourages reducing food waste by suggesting recipes that utilize ingredients users already have.
- Societal Impact: Promotes healthier eating habits and home cooking, reducing reliance on processed or takeout food.
- Scalability: The architecture is designed to scale, allowing for future expansions (e.g., integration of additional APIs, new features).

---

## Team Members
- Simran Gahra
- Hashir Owais
- Nathan Okoh
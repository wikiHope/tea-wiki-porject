# Techcareer Bootcamp Final Project

## Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [License](#license)

## Overview

The App is a web application that allows users to access information about various events such as concerts, theater performances, and more. Users can browse through available events, view details, and conveniently purchase tickets.

## Live Preview

Experience a live preview of the application's features by visiting [here.](https://techcareer-bilet.vercel.app/)

## Features

- **User Accounts:**
    - Create and manage user accounts to keep track of purchased tickets and receive updates on upcoming events.
 
- **Backoffice:**
    - Used for create, update, and delete purposes. (category, event, location etc)
    - Admin Panel is authorized by credentials.

- **Events:**
    - Events are listed on the home page with necessary information.
    - After clicking, the details of the event page are linked.

- **Event Details:**
    - Access detailed information about each event, including description, seat categories, artists, upcoming events on current location, and available ticket types.
 
- **Search and Filters:**
    - Easily find specific events using search functionality and apply filters based on categories, dates, or locations and also keywords mean that are host and event name.
 
- **Past Events:**
    - Past events are listed on a separate page.
 
- **Event Images:**
    - Each event can have one or more images, displayed with a slider on the event detail page.
 
- **Google Maps Integration:**
    - The event's address is displayed on the event detail page using Google Maps.
 
- **Popular Events Slideshow:**
    - A slideshow on the homepage showcases popular events.

- **Ticket Pricing:**
    - Some events may be ticketed, and the ticket prices may vary based on specific seating categories.

- **Social Media Sharing:**
    - On the event detail page, users can share the event on popular social media platforms using "share" buttons.

- **Responsive Design:**
    - Enjoy a seamless experience across various devices, ensuring accessibility and usability.

## Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database for storing event and user information.
- Api Key for Google Maps.

## Getting Started

1. Clone the repository: `git clone https://github.com/elifhelincarboga/techcareer-bilet.git`
2. Navigate to the project directory
3. Set up a MongoDB database and update the connection details in the configuration.
4. Navigate to the backend directory: cd backend
5. Start the backend server: npm run start
6. Navigate to the frontend directory: cd frontend
7. Start the React app: npm run dev

## Usage

- Visit http://localhost:5173 in your browser to access the App.
- Browse events, view details, and purchase tickets seamlessly.

## API Documentation

shared in /backend folder named collections.json for testing api on postman.

## License

Specify the license under which your project is distributed. For example, you can use the [MIT License](LICENSE).


# Project ReadMe
Link - https://greyowl1.netlify.app/
## Overview
This project is a web application for media management, allowing users to upload, search, and view media content. It consists of two main components: the UploadForm for uploading media content and the Searcher for searching and viewing media.

## Features
- **UploadForm:** Allows users to upload media content with details such as title, date, media source, media type, keywords, and an image link. The data is saved to the backend API.
- **Searcher:** Provides a search interface where users can search for media content based on various criteria such as media title, date, media source, and keywords. The search results are displayed in a list format.

## Technologies Used
- React: Frontend framework for building the user interface.
- React Router: Library for handling routing and navigation within the application.
- Fetch API: Used for making API calls to the backend server.
- Node.js: Backend runtime environment.
- Express.js: Backend web application framework for building the API endpoints.
- MongoDB: Database for storing media content data.

## Usage

### Uploading Media Content
1. Click on the "Upload Page" button to navigate to the UploadForm.
2. Fill in the required details for the media content, such as media title, date, media source, media type, keywords, and image link.
3. Click on the "Upload" button to submit the media content data to the backend.

### Searching for Media Content
1. Click on the "Search Page" button to navigate to the Searcher.
2. Enter search criteria such as media title, date range, media source, and keywords in the respective fields.
3. Click on the "Search" button to perform the search.
4. The search results, if any, will be displayed below the search form.

## Data Storage
The application uses MongoDB as the database for storing media content data. The backend server handles data storage and retrieval through API endpoints.

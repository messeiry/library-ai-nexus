# Library AI Nexus

A modern library management system with AI-powered search capabilities and full administrative features.

## Features

### User Features
- **AI-Powered Search**: Search for books using natural language queries
- **Smart Results**: Get AI-generated summaries of search results
- **Book Details**: View comprehensive book information including availability status
- **Checkout Status**: See if a book is available, when it was checked out, and when it's due back

### Admin Features
- **Book Management**: Complete CRUD operations for managing the library inventory
- **Real-time API Integration**: All operations directly connect to backend services
- **Book Details Management**: Update comprehensive book information including:
  - Title, author, description
  - Genre, ISBN, publisher
  - Page count, language, rating
  - Publication date
  - Checkout status

## Project info

This project was built with [Lovable](https://lovable.dev/projects/4acd3b85-586f-4531-a511-b32b578b5544).

## How can I edit this code?

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Technology Stack

This project is built with:

- **Frontend**: React with TypeScript
- **UI Components**: Custom shadcn/ui components
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Routing**: React Router
- **API Integration**: Native Fetch API
- **Build Tool**: Vite

## API Integration

The application integrates with a backend API hosted at `http://shoppychatbot.duckdns.org:3055` with the following endpoints:

### Book Search
- **GET** `/search?query={searchTerm}` - Search books using keywords
- **GET** `/rag?query={searchTerm}` - Get AI-generated summary of search results

### Book Management
- **GET** `/books/{id}` - Get detailed information about a specific book
- **GET** `/books?limit={limit}&offset={offset}` - List books with pagination
- **POST** `/books/create` - Create a new book
- **POST** `/books/update` - Update an existing book
- **DELETE** `/books/{id}` - Delete a book


## Future Enhancements

- User authentication and role-based access control
- Book checkout functionality
- User borrowing history
- Advanced filtering and sorting options
- Reading lists and recommendations

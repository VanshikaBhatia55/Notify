# Vanshika_Bhatia_EventSpotLite

A modern event discovery platform built with React and Tailwind CSS, featuring a responsive design and intuitive user interface.

## 🌟 Live Demo

[View Live Demo](https://notify-plum.vercel.app/)

## 🎯 Features

- **Responsive Design**: Seamlessly adapts to desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Event Discovery**: Browse through curated events with detailed information
- **Interactive UI**: Modern interface with smooth animations and transitions
- **Favorite System**: Save and track favorite events with local storage
- **Search Functionality**: Find events quickly with the search feature
- **Category Filtering**: Browse events by categories
- **Event Details**: View comprehensive event information in a modal
- **Rating System**: See event ratings and popularity
- **Price Information**: Clear display of event pricing
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Technologies Used

- **React.js**: Frontend framework
- **Tailwind CSS**: Styling and design
- **Vite**: Build tool
- **Lucide Icons**: Icon library
- **Local Storage API**: Data persistence

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VanshikaBhatia55/Vanshika_Bhatia_EventSpotLite.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Vanshika_Bhatia_EventSpotLite-main
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and visit `http://localhost:5173`

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/                 # React components
│   ├── EventCard.jsx          # Event card component
│   ├── EventModal.jsx         # Event modal component
│   ├── FeaturedEvent.jsx      # Featured event component
│   ├── Footer.jsx            # Footer component
│   ├── Header.jsx            # Header component with navigation
│   ├── SearchBar.jsx         # Search functionality component
│   └── ThemeToggle.jsx       # Dark/Light mode toggle
│
├── assets/                    # Static assets
│   └── images/               # Image assets
│
├── data/                     # Mock data and constants
│   └── events.js            # Event data
│
├── utils/                    # Utility functions
│   └── dateUtils.js         # Date formatting utilities
│
├── App.jsx                   # Main application component
├── index.css                 # Global styles
└── main.jsx                 # Entry point
```

Key directories and their purposes:
- `components/`: Contains all React components
- `assets/`: Static files like images
- `data/`: Mock data and constants
- `utils/`: Helper functions and utilities
- Root files: Main application files and configuration

## 🔍 Key Features Implementation

- **Theme Toggle**: Implemented using Tailwind's dark mode and React context
- **Favorites System**: Uses browser's local storage for persistent data
- **Search & Filter**: Client-side implementation with React hooks
- **Responsive Design**: Tailwind breakpoints and mobile-first approach
- **Animations**: CSS transitions and Tailwind's transform utilities




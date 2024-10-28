import React, { useState, useMemo, useRef, useCallback, Suspense } from 'react';
import { Search, Menu } from 'lucide-react';
import { mockEvents } from './data/mockData.js';
import logo from './assets/logo.jpg';
import HeroSection from './components/HeroSection';
import FeaturedEvent from './components/FeaturedEvent';
import Footer from './components/Footer';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import ErrorBoundary from './components/ErrorBoundary';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  // State to manage search term input
  const [searchTerm, setSearchTerm] = useState('');
  // State to manage the currently selected event for the modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  // State to manage favorite events using a Set for quick lookup
  const [favoriteEvents, setFavoriteEvents] = useState(new Set());
  // State to manage the mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Ref to track the upcoming events section for scrolling
  const upcomingEventsRef = useRef(null);

  // Memoized list of events filtered by the search term
  const filteredEvents = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return mockEvents.filter(event => 
      event.name.toLowerCase().includes(searchTermLower) ||
      event.location.toLowerCase().includes(searchTermLower) ||
      event.category.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm]);

  // Function to scroll to the upcoming events section
  const scrollToUpcomingEvents = useCallback(() => {
    if (upcomingEventsRef.current) {
      const navbarHeight = document.querySelector('nav').offsetHeight;
      const offset = upcomingEventsRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, []);

  // Handler for search input changes
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    scrollToUpcomingEvents();
  }, [scrollToUpcomingEvents]);

  // Handler to toggle favorite status of an event
  const handleFavoriteToggle = useCallback((eventId) => {
    setFavoriteEvents((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(eventId)) {
        newFavorites.delete(eventId);
      } else {
        newFavorites.add(eventId);
      }
      return newFavorites;
    });
  }, []);

  // Toggle function for the mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-light via-secondary-light to-primary-DEFAULT dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200">
        <Navbar 
          logo={logo} 
          searchTerm={searchTerm} 
          handleSearch={handleSearch} 
          toggleMobileMenu={toggleMobileMenu} 
          isMobileMenuOpen={isMobileMenuOpen} 
        />
        <main className="flex-grow" role="main">
          <HeroSection scrollToUpcomingEvents={scrollToUpcomingEvents} />
          <Suspense fallback={<div className="text-center py-16">Loading events...</div>}>
            <MainContent 
              filteredEvents={filteredEvents} 
              setSelectedEvent={setSelectedEvent} 
              favoriteEvents={favoriteEvents} 
              handleFavoriteToggle={handleFavoriteToggle} 
              upcomingEventsRef={upcomingEventsRef} 
              scrollToUpcomingEvents={scrollToUpcomingEvents}
            />
          </Suspense>
        </main>
        <Footer />
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

// Navbar component
const Navbar = ({ logo, searchTerm, handleSearch, toggleMobileMenu, isMobileMenuOpen }) => (
  <nav className="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg z-30" role="navigation" aria-label="Main navigation">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Notify Logo" className="w-8 h-8 rounded-lg object-cover" />
          <h1 className="text-2xl font-bold text-primary-DEFAULT dark:text-primary-light">
            Notify
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative w-96">
            <label htmlFor="desktop-search" className="sr-only">Search events</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="desktop-search"
              type="search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              placeholder="Search events, locations, or categories..."
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search events"
            />
          </div>
          <DarkModeToggle />
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <DarkModeToggle />
          <button onClick={toggleMobileMenu} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT">
            <Menu className="h-6 w-6 text-primary-DEFAULT dark:text-primary-light" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <input
              id="mobile-search"
              type="search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              placeholder="Search events, locations, or categories..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}
    </div>
  </nav>
);

// MainContent component
const MainContent = ({ filteredEvents, setSelectedEvent, favoriteEvents, handleFavoriteToggle, upcomingEventsRef, scrollToUpcomingEvents }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <FeaturedEvent event={mockEvents[0]} />
    <h2 ref={upcomingEventsRef} className="text-3xl font-bold text-light mb-8 mt-16">Upcoming Events</h2>
    {filteredEvents.length === 0 ? (
      <div className="text-center py-16 animate-fade-in" role="alert" aria-live="polite">
        <p className="text-gray-600 text-lg">No events found. Try adjusting your filters.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Events list">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => setSelectedEvent(event)}
            isFavorite={favoriteEvents.has(event.id)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    )}
  </div>
);

export default App;

import React, { memo, useCallback, useEffect, useState } from 'react';
import { X, Calendar, MapPin, Users, Heart, Tag } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

// Memoized component to prevent unnecessary re-renders
const EventModal = memo(({ 
  event, 
  onClose, 
  onFavoriteToggle 
}) => {
  // State to track if the current event is a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Update favorite status when event ID or favorite events list changes
  useEffect(() => {
    const favoriteEvents = JSON.parse(localStorage.getItem('favoriteEvents')) || [];
    setIsFavorite(favoriteEvents.includes(event.id));
  }, [event.id]);

  // Handle backdrop click to close the modal
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Handle favorite button click event
  const handleFavoriteToggle = useCallback((e) => {
    e.stopPropagation(); // Prevent event bubbling
    const favoriteEvents = JSON.parse(localStorage.getItem('favoriteEvents')) || [];
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favoriteEvents.filter(id => id !== event.id); // Remove from favorites
    } else {
      updatedFavorites = [...favoriteEvents, event.id]; // Add to favorites
    }
    localStorage.setItem('favoriteEvents', JSON.stringify(updatedFavorites)); // Update local storage
    setIsFavorite(!isFavorite); // Toggle favorite state
    onFavoriteToggle(event.id); // Notify parent component
  }, [event.id, isFavorite, onFavoriteToggle]);

  // Add event listener for 'Escape' key to close the modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Return null if no event is provided
  if (!event) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 sm:h-56">
          <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/40 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-3 left-3 right-3">
            <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white mb-1 truncate">{event.name}</h2>
            <div className="flex items-center space-x-2">
              <span className="bg-primary-DEFAULT text-white px-2 py-0.5 rounded-full text-xs font-semibold">{event.category}</span>
              <span className="text-white text-xs">{formatDate(event.date)}</span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(90vh-12rem)]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow mr-3 line-clamp-3">{event.description}</p>
            <button
              onClick={handleFavoriteToggle}
              className="bg-white dark:bg-gray-700 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex-shrink-0"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
              className={`w-5 h-5 transition-colors duration-200 ${
                isFavorite 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-400 dark:text-gray-300 hover:text-red-500'
              }`} 
            />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <EventDetail icon={MapPin} text={event.location} label="Event location" />
            <EventDetail icon={Users} text={`${event.spotsLeft} spots left`} label="Available spots" />
            <EventDetail icon={Tag} text={event.price ? `$${event.price}` : 'Free'} label="Event price" />
            <EventDetail icon={Calendar} text={formatDate(event.date)} label="Event date" />
          </div>
          <div className="mt-4">
            <button className="w-full bg-primary-light dark:bg-primary-DEFAULT text-dark dark:text-black hover:bg-primary-dark dark:hover:bg-primary-light hover:text-white dark:hover:text-dark py-2.5 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-sm font-medium">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Memoized component for displaying event details
const EventDetail = memo(({ icon: Icon, text, label }) => (
  <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 transition-all duration-300 hover:shadow-md">
    <Icon className="w-4 h-4 mr-2 text-primary-DEFAULT dark:text-primary-light flex-shrink-0" aria-hidden="true" />
    <span className="text-xs font-medium truncate" aria-label={label}>{text}</span>
  </div>
));

EventModal.displayName = 'EventModal';
EventDetail.displayName = 'EventDetail';

export default EventModal;

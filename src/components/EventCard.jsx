import React, { memo, useCallback, useState, useEffect } from 'react';
import { Calendar, MapPin, Tag, Heart, Star } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

// Memoized component to prevent unnecessary re-renders
const EventCard = memo(({ 
  event, 
  onClick,
  onFavoriteToggle,
  className = "" 
}) => {
  // State to track if the current event is a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Update favorite status when event ID changes
  useEffect(() => {
    const favoriteEvents = JSON.parse(localStorage.getItem('favoriteEvents')) || [];
    setIsFavorite(favoriteEvents.includes(event.id));
  }, [event.id]);

  // Handle card click event
  const handleClick = useCallback(() => onClick(event), [event, onClick]);

  // Handle favorite button click event
  const handleFavoriteClick = useCallback((e) => {
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

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border-2 border-transparent hover:border-primary-DEFAULT dark:hover:border-primary-light shadow-md hover:shadow-xl transition-all duration-500 animate-fade-in cursor-pointer transform hover:scale-[1.03] ${className}`}
      onClick={handleClick}
      role="article"
      aria-labelledby={`event-name-${event.id}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 bg-secondary-dark dark:bg-secondary-DEFAULT text-white dark:text-dark rounded-full text-sm font-medium shadow-md">
            {event.category}
          </span>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={handleFavoriteClick}
            className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:bg-secondary-light dark:hover:bg-secondary-DEFAULT transition-colors duration-200"
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
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h2 id={`event-name-${event.id}`} className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-DEFAULT dark:group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
          {event.name}
        </h2>
        
        <div className="space-y-3">
          <EventInfo icon={Calendar} text={formatDate(event.date)} label="Event date" />
          <EventInfo icon={MapPin} text={event.location} label="Event location" />
        </div>

        {/* Price Tag and Rating */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
          <EventInfo 
            icon={Tag} 
            text={event.price ? `$${event.price}` : 'Free'} 
            label="Event price"
          />
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{event.rating || '4.5'}</span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="text-center">
          <button 
            className="px-4 py-2 bg-primary-light dark:bg-primary-DEFAULT text-dark dark:text-black hover:bg-primary-dark dark:hover:bg-primary-light hover:text-white dark:hover:text-dark rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onClick(event);
            }}
            aria-label={`View details for ${event.name}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
});

// Memoized component for displaying event information
const EventInfo = memo(({ icon: Icon, text, label }) => (
  <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
    <Icon className="w-4 h-4 mr-2 text-primary-DEFAULT dark:text-primary-light" aria-hidden="true" />
    <span className="text-sm line-clamp-1" aria-label={label}>{text}</span>
  </div>
));

EventCard.displayName = 'EventCard';
EventInfo.displayName = 'EventInfo';

export default EventCard;

import React from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import type { Database } from '../types/supabase';

type Event = Database['public']['Tables']['events']['Row'];

interface EventCardProps {
  event: Event;
  onGetTickets: (event: Event) => void;
}

export function EventCard({ event, onGetTickets }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={event.image_url}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
            {event.category}
          </span>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {format(new Date(event.date), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{event.location}</span>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-3">{event.description}</p>
        
        <button
          onClick={() => onGetTickets(event)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
        >
          Get Tickets
          <ExternalLink className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
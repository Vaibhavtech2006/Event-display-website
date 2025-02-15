import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { EventCard } from './components/EventCard';
import { EmailModal } from './components/EmailModal';
import { supabase } from './lib/supabase';
import { insertSampleData } from './sampleData';
import type { Database } from './types/supabase';

type Event = Database['public']['Tables']['events']['Row'];

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      
      if (!data || data.length === 0) {
        // If no events exist, insert sample data
        await insertSampleData();
        // Fetch events again after inserting sample data
        const { data: newData, error: newError } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });
          
        if (newError) throw newError;
        setEvents(newData || []);
      } else {
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleGetTickets = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleEmailSubmit = async (email: string) => {
    if (!selectedEvent) return;

    try {
      const { error } = await supabase
        .from('user_emails')
        .insert([{ email, event_id: selectedEvent.id }]);

      if (error) throw error;

      window.open(selectedEvent.ticket_url, '_blank');
      setSelectedEvent(null);
      toast.success('Email saved successfully!');
    } catch (error) {
      console.error('Error saving email:', error);
      toast.error('Failed to save email');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(events.map(event => event.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Sydney Events</h1>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onGetTickets={handleGetTickets}
              />
            ))}
          </div>
        )}

        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No events found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {selectedEvent && (
        <EmailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSubmit={handleEmailSubmit}
        />
      )}
    </div>
  );
}

export default App;
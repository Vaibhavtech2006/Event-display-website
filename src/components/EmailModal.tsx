import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Database } from '../types/supabase';

type Event = Database['public']['Tables']['events']['Row'];

interface EmailModalProps {
  event: Event;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

export function EmailModal({ event, onClose, onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(email);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="text-xl font-semibold mb-4">Get Tickets for {event.title}</h3>
        
        <p className="text-gray-600 mb-6">
          Enter your email to receive event updates and proceed to the ticket page.
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Continue to Tickets'}
          </button>
        </form>
      </div>
    </div>
  );
}
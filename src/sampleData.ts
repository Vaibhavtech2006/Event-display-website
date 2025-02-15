import { supabase } from './lib/supabase';

const sampleEvents = [
  {
    title: "Sydney Opera House Grand Concert",
    description: "Experience a magical evening of classical music performed by the Sydney Symphony Orchestra at the iconic Opera House.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    location: "Sydney Opera House, Bennelong Point",
    ticket_url: "https://www.sydneyoperahouse.com",
    category: "Music",
    image_url: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&q=80"
  },
  {
    title: "Bondi Beach Festival",
    description: "Join us for a day of sun, surf, and music at the annual Bondi Beach Festival. Featuring local artists, food stalls, and beach activities.",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
    location: "Bondi Beach",
    ticket_url: "https://www.bondifestival.com",
    category: "Festival",
    image_url: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&q=80"
  },
  {
    title: "Sydney Food & Wine Fair",
    description: "Discover the finest culinary experiences Sydney has to offer. Sample dishes from top restaurants and enjoy premium wine tastings.",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks from now
    location: "The Rocks",
    ticket_url: "https://www.sydneyfoodwine.com",
    category: "Food & Drink",
    image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
  },
  {
    title: "Taronga Zoo Night Safari",
    description: "Experience the magic of Taronga Zoo after dark. Join our guided tour to see nocturnal animals and enjoy spectacular harbour views.",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    location: "Taronga Zoo, Mosman",
    ticket_url: "https://www.taronga.org.au",
    category: "Adventure",
    image_url: "https://images.unsplash.com/photo-1503919005314-c5477f5c4167?auto=format&fit=crop&q=80"
  },
  {
    title: "Sydney Tech Conference 2025",
    description: "Join industry leaders and innovators at Sydney's premier tech conference. Featuring keynotes, workshops, and networking opportunities.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month from now
    location: "International Convention Centre Sydney",
    ticket_url: "https://www.sydneytechconf.com",
    category: "Technology",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
  },
  {
    title: "Harbour Bridge Climb Sunset Special",
    description: "Climb the iconic Sydney Harbour Bridge at sunset for breathtaking views of the city and harbour. Special photography session included.",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    location: "Sydney Harbour Bridge",
    ticket_url: "https://www.bridgeclimb.com",
    category: "Adventure",
    image_url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80"
  }
];

export async function insertSampleData() {
  const { data, error } = await supabase
    .from('events')
    .insert(sampleEvents)
    .select();

  if (error) {
    console.error('Error inserting sample data:', error);
    throw error;
  }

  return data;
}
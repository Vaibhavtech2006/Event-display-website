import axios from 'axios';
import cheerio from 'cheerio';
import { supabase } from '../lib/supabase.js';

const EVENTS_URL = 'https://www.whatson.sydney.gov.au/events';

async function scrapeEvents() {
  try {
    console.log('Starting event scraping...');
    const { data } = await axios.get(EVENTS_URL);
    const $ = cheerio.load(data);
    const events = [];

    // Select event cards from the page
    $('.event-card').each((_, element) => {
      const $element = $(element);
      
      const event = {
        title: $element.find('.event-title').text().trim(),
        description: $element.find('.event-description').text().trim(),
        date: new Date($element.find('.event-date').attr('datetime')).toISOString(),
        location: $element.find('.event-location').text().trim(),
        ticket_url: $element.find('.event-link').attr('href'),
        category: $element.find('.event-category').text().trim(),
        image_url: $element.find('.event-image').attr('src')
      };

      // Only add events with all required fields
      if (Object.values(event).every(value => value)) {
        events.push(event);
      }
    });

    if (events.length > 0) {
      // Delete existing events
      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .not('id', 'is', null);

      if (deleteError) {
        throw deleteError;
      }

      // Insert new events
      const { error: insertError } = await supabase
        .from('events')
        .insert(events);

      if (insertError) {
        throw insertError;
      }

      console.log(`Successfully scraped and inserted ${events.length} events`);
    } else {
      console.log('No events found to scrape');
    }
  } catch (error) {
    console.error('Error scraping events:', error);
    throw error;
  }
}

// Run the scraper
scrapeEvents();
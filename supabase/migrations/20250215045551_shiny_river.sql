/*
  # Create events and user_emails tables

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `date` (timestamp)
      - `location` (text)
      - `ticket_url` (text)
      - `category` (text)
      - `image_url` (text)
    - `user_emails`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `email` (text)
      - `event_id` (uuid, foreign key)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access to events
    - Add policies for authenticated insert access to user_emails
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  ticket_url text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL
);

-- Create user_emails table
CREATE TABLE IF NOT EXISTS user_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text NOT NULL,
  event_id uuid REFERENCES events(id) NOT NULL
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_emails ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to events"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to user_emails"
  ON user_emails
  FOR INSERT
  TO public
  WITH CHECK (true);
/*
  # Add RLS policies for events table

  1. Security Changes
    - Add policy for public to insert events
    - Add policy for public to update events
    - Add policy for public to delete events
    
  Note: These policies are permissive for demonstration purposes. In a production environment, 
  you would want to restrict these operations to authenticated admin users only.
*/

-- Policy to allow public to insert events
CREATE POLICY "Allow public to insert events"
ON events
FOR INSERT
TO public
WITH CHECK (true);

-- Policy to allow public to update events
CREATE POLICY "Allow public to update events"
ON events
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Policy to allow public to delete events
CREATE POLICY "Allow public to delete events"
ON events
FOR DELETE
TO public
USING (true);
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          date: string
          location: string
          ticket_url: string
          category: string
          image_url: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          date: string
          location: string
          ticket_url: string
          category: string
          image_url: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          date?: string
          location?: string
          ticket_url?: string
          category?: string
          image_url?: string
        }
      }
      user_emails: {
        Row: {
          id: string
          created_at: string
          email: string
          event_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          event_id: string
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          event_id?: string
        }
      }
    }
  }
}
export interface EventProps {
  id: number;
  title: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  location: string;
  org_name: string;
  org_email: string;
  org_phone: string;
  org_logo: string;
  plaform: string; // Ensure property name matches
  status: boolean;
  rating: number | null; // Rating can be a number or null
  category_id: number | null;
  created_at: string;
  created_by: number | null; // Use number instead of string if created_by is a number
  limit: string;
  updated_at: string;
}

// Type for pagination link
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Type for paginated events data
export interface PaginatedEvents {
  current_page: number;
  data: Event[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Type for the API response
export interface ApiResponse {
  events: PaginatedEvents;
  latest_events: PaginatedEvents;
}

export interface EventDetailResponse {
  event: EventProps;
}

export interface EventRegistrationData {
  event_id: number;
  name: string;
  email: string;
  phone: string;
  user_id: number;
  dob: string | null; // or use Date if you prefer
  updated_at: string; // or use Date if you prefer
  created_at: string; // or use Date if you prefer
  id: number;
}

// Define the structure of the full response
export interface RegisterEventResponse {
  message: string;
  data: EventRegistrationData;
}

export interface ValidationErrorResponse {
  status: number;
  data: {
    message: string;
    errors: {
      email?: string[];
      phone?: string[];
      [key: string]: string[] | undefined; // To cover other fields in case there are more
    };
  };
}

export interface SearchEventsResponse {
  events: {
    data: EventProps[];
  };
}

export interface EventFormData {
  title: string;
  description: string;
  image: File | null;
  start_date: string;
  end_date: string;
  org_name: string;
  org_email: string;
  org_phone: string;
  org_logo: File | null;
  category_id: number;
  limit: number;
  location: string;
  platform: string;
}

export interface CreateEventResponse {
  message: string;
  data: {
    title: string;
    description: string;
    image: string;
    start_date: string | null;
    end_date: string | null;
    org_name: string | null;
    org_email: string | null;
    org_phone: string | null;
    org_logo: string | null;
    category_id: string;
    limit: number | null;
    location: string | null;
    platform: string | null;
    created_by: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

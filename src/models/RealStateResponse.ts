export interface IRealEstateApiResponse {
  status: string;
  results: number;
  last_update: string; // ISO 8601 format
  data: Property[];
  pagination: Pagination;
}

interface Property {
  property_id: string;
  title: string;
  description: string;
  type: PropertyType;
  for_sale: boolean;
  // Conditional pricing based on for_sale flag
  price?: number;             // Present if for_sale === true
  rental_price?: number;      // Present if for_sale === false
  currency: 'COP' | 'USD';    // Only COP used in this example
  location: Location;
  specs: PropertySpecs;
  amenities: string[];
  images: string[];
  contact: ContactInfo;
  listing_date: string;       // ISO 8601 format
}

// Property types (extensible)
type PropertyType = 'apartamento' | 'casa' | 'comercial' | 'lote' | 'finca';

interface Location {
  zone: string;               // e.g., "El Poblado", "Laureles-Estadio"
  neighborhood: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface PropertySpecs {
  bedrooms?: number;          // Optional for commercial properties
  bathrooms?: number;         // Optional for commercial properties
  area_m2: number;            // Always present
  floor?: number;             // For apartments (piso)
  floors?: number;            // For houses (número de pisos)
  stratum?: number;           // 1-6 (solo Colombia)
  parking_spots?: number;
  year_built?: number;
}

interface ContactInfo {
  agency: string;
  agent: string;
  phone: string;
}

interface Pagination {
  current_page: number;
  total_pages: number;
  per_page: number;
}
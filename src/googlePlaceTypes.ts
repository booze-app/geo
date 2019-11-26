interface GeocoderAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

interface PlaceAspectRating {
    rating: number;
    type: string;
}

interface LatLng {
    lat: number;
    lon: number;
}

interface LatLngBounds {
    southwest: LatLng;
    northeast: LatLng;
}

interface PlaceGeometry {
    location: LatLng;
    viewport: LatLngBounds;
}

interface OpeningHoursTime {
    day: number;
    hours: number;
    minutes: number;
    nextDate: number;
    time: string;
}

interface OpeningPeriod {
    open: OpeningHoursTime;
    close?: OpeningHoursTime;
}

interface OpeningHours {
    open_now: boolean;
    periods: OpeningPeriod[];
    weekday_text: string[];
}

interface PlacePhoto {
    height: number;
    html_attributions: string[];
    width: number;
}

interface PlaceReview {
    aspects: PlaceAspectRating[];
    author_name: string;
    author_url: string;
    language: string;
    text: string;
}

export interface PlaceResult {
    address_components?: GeocoderAddressComponent[];
    adr_address?: string;
    aspects?: PlaceAspectRating[];
    formatted_address?: string;
    formatted_phone_number?: string;
    geometry: PlaceGeometry;
    html_attributions?: string[];
    icon?: string;
    id?: string;
    international_phone_number?: string;
    name: string;
    opening_hours?: OpeningHours;
    permanently_closed?: boolean;
    photos?: PlacePhoto[];
    place_id: string;
    price_level?: number;
    rating?: number;
    reviews?: PlaceReview[];
    types?: string[];
    url?: string;
    utc_offset?: number;
    vicinity?: string;
    website?: string;
}

//Todo: Token
interface PlaceSearchPagination {
    hasNextPage: boolean;
}

enum PlacesServiceStatus {
    INVALID_REQUEST = 'INVALID_REQUEST',
    NOT_FOUND = 'NOT_FOUND',
    OK = 'OK',
    OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
    REQUEST_DENIED = 'REQUEST_DENIED',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    ZERO_RESULTS = 'ZERO_RESULTS',
}

export interface NearbySearchResult {
    results: PlaceResult[],
    status: PlacesServiceStatus,
    pagination?: PlaceSearchPagination,
}
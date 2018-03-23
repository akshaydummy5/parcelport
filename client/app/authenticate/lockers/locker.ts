export interface Locker {
    _id?: string;
    name?: string;
    locationId?: any;
    geoId?: string;
    placeId?: string;
    streetNumber?: string;
    route?: string;
    city?: string;
    state?: string;
    stateCode?: string;
    country?: string;
    countryCode?: string;
    postalCode?: string;
    formattedAddress?: string;
    latitude?: number;
    longitude?: number;
    availableSlots?: number;
    totalSlots?: number;
    totalReceived?: number;
    totalShipped?: number;
}

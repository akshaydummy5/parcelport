export interface User {
    _id?: string;
    role?: string;
    companyId?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    postalCode?: string;
    language?: string;
    lastLogin?: string;
    totPackSent?: number;
    totPackReceived?: number;
    shipmentPerMonth?: number;
    preferredPickupLocation?: string;
    preferredDropOffLocation?: string;
    lastLocation?: string;
    code?: string;
    createdAt?: string;
    provider?: string;
    password?: string;
}

export interface Shipment {
    _id?: string;
    packages?: [{
        label?: string;
        size?: string;
        status?: string;
        packageType?: string;
        weight?: string;
        shipmentId?: string;
        pickupCode?: string;
    }];
    userId?: string;
    companyId?: any;
    sender?: any;
    receiverEmail?: string;
    receiverPhone?: string;
    receiver?: {
        name?: string;
        email?: string;
        phone?: string;
    };
}

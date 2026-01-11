export interface ProductInterface {
    _id: string;
    product_id: number;
    name: string;
    description: string;
    category: string;
    discountedPrice?: number;
    isOfferActive?: boolean;
    price: number;
    delivery_days: number;
    images: string[];
    offer_status: boolean;
    offer_percentage: number;
    offer_start_date: string; // ISO date string
    offer_end_date: string;   // ISO date string
    star_rating: number;
    star_rate_value: number;
    __v: number;
}

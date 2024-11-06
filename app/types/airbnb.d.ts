export type Accessibility = {
    [x: string]: any;
    nearWater: boolean;
    closeToNature: boolean;
    wheelChairAccessible: boolean;
    petFriendly: boolean;
    spacious: boolean;
    apartment: boolean;
};

export type Airbnb = {
    airbnbId: string;
    title: string;
    description: string;
    guests: number;
    pricePerNight: number;
    images: string[];
    accessibility: Accessibility;
};

export type Booking = {
    bookingId: string;
    airbnbId: string;
    userId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    paymentStatus: "paid" | "failed";
}
export type Accessibility = {
    [key: string]: boolean;
    wheelChairAccessible: boolean;
    spacious: boolean;
    apartment: boolean;
    petFriendly: boolean;
    closeToNature: boolean;
    nearWater: boolean;
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
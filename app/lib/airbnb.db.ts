import { collection, getDocs } from "firebase/firestore";
import { Airbnb } from "../types/airbnb";
import { db } from "@/firebase.config";

export const fetchAirbnbs = async (): Promise<Airbnb[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'airbnbs'));
        const airbnbs: Airbnb[] = [] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                airbnbId: doc.id,
                title: data.title,
                description: data.description,
                guests: data.guests,
                pricePerNight: data.pricePerNight,
                images: data.images,
                accessibility: {
                    nearWater: data.nearWater,
                    closeToNature: data.closeToNature,
                    wheelChairAccessible: data.wheelChairAccessible,
                    elevator: data.elevator,
                    petFriendly: data.petFriendly,
                    spacious: data.spacious,
                    apartment: data.apartment
                },
            } as Airbnb;
        })

        return airbnbs;
    } catch (error) {
        console.error('Error fetching airbnbs:', error);
        throw new Error('Failed to fetch airbnbs');
    }
}
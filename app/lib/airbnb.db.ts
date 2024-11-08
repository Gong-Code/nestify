import { collection, doc, getDoc, getDocs, Query, query, where } from "firebase/firestore";
import { Airbnb } from "../types/airbnb";
import { db } from "@/firebase.config";

export const fetchAirbnbs = async (searchValue: string = ""): Promise<Airbnb[]> => {
    try {
      let q: Query;
      if (searchValue) {
        q = query(collection(db, 'airbnbs'), where("title", "==", searchValue));
      } else {
        q = collection(db, 'airbnbs');
      }
        const querySnapshot = await getDocs(q);
        const airbnbs: Airbnb[] = querySnapshot.docs.map((doc) => {
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

export const fetchAirbnbById = async (airbnbId: string): Promise<Airbnb | null> => {
  try {
    const docRef = doc(db, 'airbnbs', airbnbId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        airbnbId: docSnap.id,
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
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching airbnb by id:', error);
    throw new Error('Failed to fetch airbnb by id');
  }
};


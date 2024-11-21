import { fetchAirbnbById } from "@/app/lib/airbnb.db";
import { AirbnbCardDetails } from "./_component/AirbnbCardDetails";

type DetailsPageProps = {
  params: { id: string };
};

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const airbnb = await fetchAirbnbById(params.id);

  if (!airbnb) {
    return <div>Airbnb not found</div>;
  }

  return <AirbnbCardDetails airbnb={airbnb} maxGuests={airbnb.guests} />;
};

export default DetailsPage;

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

  return (
    <div>
      <AirbnbCardDetails airbnb={airbnb} />
    </div>
  );
};

export default DetailsPage;

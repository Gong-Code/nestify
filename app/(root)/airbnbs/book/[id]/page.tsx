import { fetchAirbnbById } from "@/app/lib/airbnb.db";
import { AirbnbCardDetails } from "./_component/AirbnbCardDetails";
import { Footer } from "@/app/(root)/_component/Footer";

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
      <AirbnbCardDetails airbnb={airbnb} userId={""} />
    </div>
  );
};

export default DetailsPage;

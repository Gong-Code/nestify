import { AccessibilityIconsLandingPage } from "@/app/components/AccessibilityIcons";
import { Airbnb } from "@/app/types/airbnb";
import { useRouter } from "next/navigation";
import React from "react";

type AirbnbCardProps = {
  airbnb: Airbnb;
};

export const AirbnbCard = ({ airbnb }: AirbnbCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/airbnbs/book/${airbnb.airbnbId}`);
    console.log("Clicked on card", airbnb.airbnbId);
  };

  return (
    <div
      className="border rounded-lg max-w-[18.75rem] cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500"
      onClick={handleCardClick}
    >
      <img
        src={airbnb.images[0]}
        alt={airbnb.title}
        width={300}
        height={200}
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{airbnb.title}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <AccessibilityIconsLandingPage accessibility={airbnb.accessibility} />
        </div>
      </div>
    </div>
  );
};

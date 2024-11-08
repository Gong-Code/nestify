import React from "react";
import { Accessibility } from "@/app/types/airbnb";
import {
  Accessibility as AccessibilityIcon,
  House,
  Building,
  Waves,
  PawPrint,
  TreePine,
  SlidersHorizontal,
} from "lucide-react";
import { FormatFeatureName } from "../helpers/FormatFeatureName";

type AccessibilityIconsProps = {
  accessibility: Accessibility;
};

const icons: { [key: string]: JSX.Element } = {
  nearWater: <Waves />,
  closeToNature: <TreePine />,
  wheelChairAccessible: <AccessibilityIcon />,
  elevator: <SlidersHorizontal />,
  petFriendly: <PawPrint />,
  spacious: <House />,
  apartment: <Building />,
};

export const AccessibilityIcons = ({
  accessibility,
}: AccessibilityIconsProps) => {
  return (
    <div className="flex flex-col gap-6 mt-2">
      {Object.keys(accessibility).map(
        (feature) =>
          accessibility[feature] && (
            <div key={feature} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 border-2 border-blue-500 rounded-full">
                {icons[feature] || (
                  <span className="text-blue-500">No Icon Found</span>
                )}
              </div>
              <span>{FormatFeatureName(feature)}</span>
            </div>
          )
      )}
    </div>
  );
};

export const AccessibilityIconsLandingPage = ({
  accessibility,
}: AccessibilityIconsProps) => {
  return (
    <div className="flex gap-2 mt-2">
      {Object.keys(accessibility).map(
        (feature) =>
          accessibility[feature] && (
            <div key={feature} className="flex items-center gap-2">
              {icons[feature] || (
                <span className="text-blue-500">No Icon Found</span>
              )}
            </div>
          )
      )}
    </div>
  );
};

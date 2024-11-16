export const FormatFeatureName = (feature: string) => {
  return feature
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

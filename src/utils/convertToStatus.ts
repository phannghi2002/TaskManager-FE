export const capitalizeStatus = (status: string): string => {
  if (!status) return "";

  const lower = status.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

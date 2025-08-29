export const capitalizeStatus = (status: string): string => {
  if (!status) return "";
  // Chuyển tất cả về chữ thường, sau đó viết hoa chữ cái đầu tiên
  const lower = status.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

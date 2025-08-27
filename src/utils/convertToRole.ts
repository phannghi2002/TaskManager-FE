export const capitalizeRole = (role: string): string => {
  if (!role) return "";
  // Chuyển tất cả về chữ thường, sau đó viết hoa chữ cái đầu tiên
  const lower = role.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

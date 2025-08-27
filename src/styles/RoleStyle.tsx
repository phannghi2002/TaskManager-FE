import { Chip, type SxProps, type Theme } from "@mui/material";

interface RoleStyle {
  backgroundColor: string;
  color: string;
}

// 2. Định nghĩa mapping các Role (sử dụng Record để an toàn kiểu)
// Nếu bạn đã có kiểu UserRole ở file khác, hãy import nó vào.

export type UserRole = "Manager" | "Leader" | "Employee";

const roleStyles: Record<UserRole, RoleStyle> = {
  Manager: {
    backgroundColor: "#E4DDFE", // Màu nền
    color: "#4A148C", // Màu chữ
  },
  Leader: {
    backgroundColor: "#D9E8FE",
    color: "#1565C0",
  },
  Employee: {
    backgroundColor: "#EBEBEB",
    color: "#424242",
  },
};

// 3. Định nghĩa Props cho RoleChip
interface RoleChipProps {
  role: UserRole;
}

// 4. Component chính
const RoleChip = ({ role }: RoleChipProps) => {
  // Lấy style tương ứng, nếu không có thì mặc định là Member (hoặc một style default)
  const style = roleStyles[role] || roleStyles.Employee;

  return (
    <Chip
      label={role}
      size="small"
      sx={
        {
          ...style, // Áp dụng backgroundColor và color
          fontWeight: "600",
          borderRadius: "6px",
          // Tùy chỉnh thêm padding nếu cần để chip to hơn
          px: "4px",
        } as SxProps<Theme>
      } // Ép kiểu SxProps để TypeScript không báo lỗi khi dùng spread operator
    />
  );
};

export default RoleChip;

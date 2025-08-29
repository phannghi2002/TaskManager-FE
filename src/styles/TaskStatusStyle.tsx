import { Chip, type SxProps, type Theme } from "@mui/material";

interface StatusStyle {
  backgroundColor: string;
  color: string;
}

// 2. Định nghĩa mapping các Role (sử dụng Record để an toàn kiểu)
// Nếu bạn đã có kiểu UserRole ở file khác, hãy import nó vào.

export type TaskStatus = "To_do" | "In_progress" | "Done";

const statusStyles: Record<TaskStatus, StatusStyle> = {
  To_do: {
    backgroundColor: "#E4DDFE", // tím nhạt
    color: "#4A148C", // tím đậm
  },
  In_progress: {
    backgroundColor: "#D9E8FE", // xanh nhạt
    color: "#1565C0", // xanh dương
  },
  Done: {
    backgroundColor: "#E8F5E9", // xanh lá nhạt
    color: "#2E7D32", // xanh lá đậm
  },
};

// 3. Định nghĩa Props cho RoleChip
interface StatusChipProps {
  status: TaskStatus;
}

// 4. Component chính
const StatusChip = ({ status }: StatusChipProps) => {
  // Lấy style tương ứng, nếu không có thì mặc định là Member (hoặc một style default)
  const style = statusStyles[status] || statusStyles.To_do;

  return (
    <Chip
      label={status}
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

export default StatusChip;

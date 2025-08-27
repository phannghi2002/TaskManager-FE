import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { format } from "date-fns";

interface UserDetailRowProps {
  label: string;
  value: string | number | React.ReactNode;
  isComponent?: boolean;

  edit?: boolean;
  isSelect?: boolean;
  options?: string[];

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserDetailRow = ({
  label,
  value,
  isComponent = false,
  edit = false, // Lấy prop edit
  isSelect = false,
  options = [],
  onChange,
}: UserDetailRowProps) => {
  const isReadOnly = !edit;
  // Định nghĩa các style chung cho input
  const baseInputPropsSx = {
    borderRadius: "12px",
    backgroundColor: isReadOnly ? "#f5f5f5" : "#ffffff",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isReadOnly ? "#e0e0e0 !important" : "#4A90E2", // Đổi màu border khi edit
    },
    height: "100%",
  };

  let displayValue = value;

  if (!isComponent && value instanceof Date) {
    displayValue = format(value, "dd/MMM/yyyy h:mm aa");
  }

  // 1. Tạo InputProps động
  const dynamicInputProps = isComponent
    ? {
        readOnly: true,
        startAdornment: (
          <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
            {value} {/* Chip (RoleChip) được đặt ở đây */}
          </Box>
        ),
        sx: {
          ...baseInputPropsSx,

          "& .MuiOutlinedInput-input": {
            paddingLeft: "14px",
            paddingRight: "14px",
            paddingTop: "0 !important",
            paddingBottom: "0 !important",
          },
        },
      }
    : {
        readOnly: isReadOnly,
        sx: {
          ...baseInputPropsSx,

          "& .MuiOutlinedInput-input": {
            paddingTop: "4px",
            paddingBottom: "4px",
          },
        },
      };

  let inputElement;

  if (isSelect && edit) {
    inputElement = (
      <TextField
        select // Biến TextField thành Select
        value={displayValue || ""}
        variant="outlined"
        sx={{ width: "80%", height: "100%" }}
        InputProps={{ sx: dynamicInputProps.sx }} // Dùng lại style nền
        onChange={onChange}
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    );
  } else {
    // Trạng thái 2: Mặc định (TextField ReadOnly hoặc Editable)
    inputElement = (
      <TextField
        value={isComponent ? "" : displayValue}
        variant="outlined"
        sx={{
          width: "80%",
          height: "100%",
        }}
        InputProps={dynamicInputProps}
        onChange={onChange}
        size="small"
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        alignItems: "center",
        mb: 2,
        height: "40px", // Đã giảm xuống 30px
      }}
    >
      {/* Label */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          color: "#555",
          width: "20%",
          lineHeight: "30px",
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>

      {inputElement}
    </Box>
  );
};

export default UserDetailRow;

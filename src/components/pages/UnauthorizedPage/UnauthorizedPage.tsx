import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 2,
        minHeight: "calc(100vh)",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Box
        component="img"
        src="https://hosttsp.com/wp-content/uploads/2024/04/Add-a-heading-1-1-1024x574.webp"
        alt="403 Forbidden"
        sx={{
          width: "60%",
          maxWidth: "100%",
          mb: 3,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "grey.800",
        }}
      >
        Truy cập bị từ chối
      </Typography>
      <Typography
        sx={{
          color: "grey.600",
          mb: 3,
        }}
      >
        Bạn không có quyền truy cập vào trang này. Vui lòng quay lại trang chính
        hoặc liên hệ quản trị viên nếu bạn nghĩ đây là lỗi.
      </Typography>

      <Button
        onClick={() => navigate("/login")}
        variant="contained"
        sx={{
          px: 3,
          // py: 1,
          backgroundColor: "blue.600",
          color: "white",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "blue.700",
          },
          transition: "background-color 0.3s",
        }}
      >
        Quay về trang chủ
      </Button>
    </Box>
  );
}

export default UnauthorizedPage;

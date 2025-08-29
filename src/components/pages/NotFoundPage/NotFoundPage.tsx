import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

function NotFoundPage() {
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
        src="https://i.imgur.com/qIufhof.png"
        alt="404 Not Found"
        sx={{
          width: 384,
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
        Oops! Không tìm thấy trang
      </Typography>
      <Typography
        sx={{
          color: "grey.600",
          mb: 3,
        }}
      >
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </Typography>
      <Button
        onClick={() => navigate("/login")}
        variant="contained"
        sx={{
          px: 3,
          py: 1,
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

export default NotFoundPage;

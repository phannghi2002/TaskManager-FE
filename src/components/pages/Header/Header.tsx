import { AppBar, Box, Button, Toolbar } from "@mui/material";

import logo from "../../../assets/images/starack_logo.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar color="transparent" elevation={0}>
      <Toolbar
        sx={{
          margin: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Description of image"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />

          <Box sx={{ fontSize: "30px", fontWeight: "600", marginLeft: "10px" }}>
            Starack
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          component={Link}
          to="/login"
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

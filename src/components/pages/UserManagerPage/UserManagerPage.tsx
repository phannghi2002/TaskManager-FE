import { Avatar, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserManagerTable from "../../table/UserManagerTable";

const UserManagerPage = () => {
  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "12px 20px",
        }}
      >
        <SearchIcon
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />

        <Box
          sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              fontSize: "16px",
              width: "30px",
              height: "30px",
              marginLeft: "8px",
            }}
          >
            N
          </Avatar>

          <ExpandMoreIcon
            sx={{
              display: "flex",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ margin: "40px 80px" }}>
        <Box sx={{ fontSize: "30px", fontWeight: "600", marginBottom: "16px" }}>
          User management
        </Box>

        <Box>
          <UserManagerTable />
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagerPage;

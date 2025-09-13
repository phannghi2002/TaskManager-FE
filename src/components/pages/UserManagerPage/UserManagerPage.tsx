import { Box } from "@mui/material";

import UserManagerTable from "../../table/UserManagerTable";

const UserManagerPage = () => {
  return (
    <Box>
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

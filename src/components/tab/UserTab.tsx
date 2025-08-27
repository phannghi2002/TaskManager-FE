import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserDetailRow from "../row/UserDetailRowProps";
import RoleChip from "../../styles/RoleStyle";
import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UserDetailLogTable from "../table/UserDetailLogTable";
import { useDispatch } from "react-redux";
import { getAllUser, updateUser } from "../../actions/user/userActions";
import type { Dayjs } from "dayjs";
import type { AppDispatch } from "../../app/store";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface UserUpdateData {
  // email?: string;
  // city?: string;
  // fullName?: string;
  // role?: string;

  userId: string;
  body: {
    email?: string;
    fullName?: string;
    dob?: Dayjs | null;
    city?: string;
    role?: string;
  };
}

export type UserRole = "Manager" | "Leader" | "Employee";

const ROLE_OPTIONS: UserRole[] = ["Manager", "Leader", "Employee"];
const CITY_OPTIONS = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"];

interface UserProps {
  // Use a name like UserProps to avoid confusion
  user: {
    userId: string;
    email: string;
    fullName: string;
    role: UserRole;
    joinDate: string;
    city: string;
  };
  edit?: boolean;
  onClose: () => void;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserTab({ user, edit, onClose }: UserProps) {
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch<AppDispatch>();
  console.log("in ra user nè", user);

  const [formValue, setFormValue] = React.useState({
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    city: user.city,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleUpdate = async () => {
    // Tạo biến local, chỉ tồn tại trong hàm này
    const changedFields: {
      email?: string;
      fullName?: string;
      dob?: Dayjs | null;
      city?: string;
      role?: string;
    } = {};

    // So sánh và thêm các trường đã thay đổi vào updatedFields
    if (formValue.city !== user.city) {
      changedFields.city = formValue.city;
    }
    if (formValue.fullName !== user.fullName) {
      changedFields.fullName = formValue.fullName;
    }
    if (formValue.role !== user.role) {
      changedFields.role = formValue.role.toLocaleUpperCase();
    }
    if (formValue.email !== user.email) {
      changedFields.email = formValue.email;
    }

    const requestData: UserUpdateData = {
      userId: user.userId, // Assuming you have access to the user's ID
      body: changedFields,
    };

    console.log("Data to send to API:", requestData);

    // Bây giờ updatedFields là một đối tượng hoàn chỉnh, có thể gửi đi

    // Gửi updatedFields tới backend
    // ...

    await dispatch(updateUser(requestData));
    onClose();
    await dispatch(getAllUser());
  };

  const renderRoleField = () => {
    if (edit) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            alignItems: "center",
            mb: 2,
            height: "40px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", color: "#555", width: "20%" }}
          >
            Role
          </Typography>

          <TextField
            select
            label=""
            value={formValue.role}
            onChange={(e) =>
              setFormValue({ ...formValue, role: e.target.value as UserRole })
            }
            variant="outlined"
            size="small"
            sx={{ width: "80%" }}
            InputProps={{
              sx: {
                borderRadius: "12px",
                backgroundColor: "#fff",
                height: "100%",
              },
            }}
          >
            {ROLE_OPTIONS.map((role) => (
              <MenuItem key={role} value={role}>
                <RoleChip role={role} />
              </MenuItem>
            ))}
          </TextField>
        </Box>
      );
    }

    return (
      <UserDetailRow
        label="Role"
        value={<RoleChip role={formValue.role} />}
        isComponent={true}
      />
    );
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ marginLeft: "16px", gap: "0" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#0F8EEF",
              height: 4,
              borderRadius: 1,

              textTransform: "none",
            },
          }}
        >
          <Tab
            label="Overview"
            sx={{
              textTransform: "none",
              p: 0,
              minWidth: 0,
              marginRight: "16px",
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Logs"
            sx={{ textTransform: "none", p: 0, minWidth: 0 }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserDetailRow label="User ID" value={user.userId} />
        <UserDetailRow
          label="Email"
          // value={user.email}
          value={formValue.email}
          edit={edit}
          onChange={(e) => {
            console.log("New Email:", e.target.value);
            setFormValue({
              ...formValue,
              email: e.target.value,
            });
          }}
        />
        <UserDetailRow
          label="Full name"
          value={formValue.fullName}
          edit={edit}
          onChange={(e) => {
            console.log("New Email:", e.target.value);
            setFormValue({
              ...formValue,
              fullName: e.target.value,
            });
          }}
        />
        {/* <UserDetailRow
          label="Role"
          value={<RoleChip role={formValue.role} />}
          isComponent={true}
        /> */}
        {renderRoleField()}

        <UserDetailRow
          label="City"
          value={formValue.city}
          edit={edit}
          isSelect={true} // Báo cho UserDetailRow dùng Select
          options={CITY_OPTIONS} // Truyền danh sách tùy chọn
          onChange={(e) => {
            setFormValue({
              ...formValue,
              city: e.target.value, // Giá trị đã được chọn
            });
          }}
        />
        {edit && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingTop: "24px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0F8EEF",
                borderRadius: "12px",
                color: "#000",
                fontWeight: "600",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                "&:hover": {
                  bgcolor: "#0C80D8",
                },
              }}
              onClick={handleUpdate}
            >
              Update
            </Button>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#D0BABA",
                borderRadius: "12px",
                color: "#000",
                fontWeight: "600",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                "&:hover": {
                  bgcolor: "#CAAEAE",
                },
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TextField
          fullWidth
          placeholder="Search something"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#A6ABAF" }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "10px",
              backgroundColor: "#fff",
              height: "36.5px",
              fontSize: "14px",
              marginBottom: "16px",
            },
          }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E0E0E0 !important",
            },
          }}
        />

        <UserDetailRow label="Created date" value={user.joinDate} />
        <UserDetailRow label="Updated" value={user.joinDate} />

        <UserDetailLogTable />
      </CustomTabPanel>
    </Box>
  );
}

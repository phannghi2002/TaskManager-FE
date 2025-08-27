import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import { format } from "date-fns";
import { toast } from "react-toastify";
import DeleteDialog from "../dialog/DeleteDialog";
import { useEffect, useMemo, useState } from "react";
import UserDetailsDrawer from "../draw/UserDetailsDrawer";
import RoleChip from "../../styles/RoleStyle";
import CreateMemberDialog from "../dialog/CreateMemberDialog";
import { getAllUser, searchUser } from "../../actions/user/userActions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { capitalizeRole } from "../../utils/convertToRole";

type UserRole = "Manager" | "Leader" | "Employee";

interface Column {
  id: "no" | "userId" | "fullName" | "email" | "role" | "joinDate" | "action";
  label: string;
  minWidth?: string;
  align?: "right" | "center";
  render?: (row: Data) => React.ReactNode;
}

interface Data {
  no: number;
  userId: string;
  fullName: string;
  email: string;
  role: string;
  joinDate: Date;
  city: string;
}

export default function UserManagerTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Data | null>(null);

  const handleOpenDrawer = (user: Data) => {
    setSelectedUser(user);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedUser(null);
  };

  const handleOpenDrawerEdit = (user: Data) => {
    setSelectedUser(user);
    setOpenDrawerEdit(true);
  };

  const handleCloseDrawerEdit = () => {
    setOpenDrawerEdit(false);
    setSelectedUser(null);
  };

  const handleClickOpen = (user: Data) => {
    console.log("dm");

    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  const handleClickAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const columns: readonly Column[] = [
    { id: "no", label: "NO", minWidth: "5%" },

    {
      id: "userId",
      label: "USER ID",
      minWidth: "10%",
      render: (row: Data) => {
        const truncatedUserId = row.userId.substring(0, 6) + "...";
        const handleCopy = () => {
          navigator.clipboard.writeText(row.userId);
          toast.success("Copy successfully");
        };

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <span>{truncatedUserId}</span>
            <Tooltip title="Copy to clipboard">
              <IconButton onClick={handleCopy} size="small">
                <ContentCopyTwoToneIcon
                  fontSize="small"
                  sx={{ color: "#0F8EEF" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    { id: "fullName", label: "FULL NAME", minWidth: "10%" },
    { id: "email", label: "EMAIL", minWidth: "20%" },

    {
      id: "role",
      label: "ROLE",
      minWidth: "10%",
      render: (row) => {
        return <RoleChip role={row.role as UserRole} />;
      },
    },
    { id: "joinDate", label: "JOIN DATE", minWidth: "10%" },
    {
      id: "action",
      label: "ACTION",

      align: "center",

      render: (row) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <IconButton size="small" aria-label="view">
            <VisibilityIcon
              fontSize="small"
              onClick={() => handleOpenDrawer(row)}
            />
          </IconButton>
          <IconButton size="small" aria-label="edit">
            <EditIcon
              fontSize="small"
              onClick={() => handleOpenDrawerEdit(row)}
            />
          </IconButton>
          <IconButton
            size="small"
            aria-label="delete"
            onClick={() => handleClickOpen(row)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: any) => store);
  const apiUsers: Data[] = user.users;

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const mappedRows: Data[] = useMemo(() => {
    if (!apiUsers || apiUsers.length === 0) return [];

    return apiUsers.map((item: Data, index) => {
      const joinedDate = item.joinDate ? new Date(item.joinDate) : new Date();

      return {
        no: index + 1,
        userId: item.userId,
        fullName: item.fullName,
        email: item.email,
        role: capitalizeRole(item.role),
        joinDate: joinedDate,
        city: item.city,
      };
    });
  }, [apiUsers]);

  const totalRows = mappedRows.length;

  const [keyword, setKeyword] = useState("");
  const handleSearch = async () => {
    console.log("keyword", keyword);
    await dispatch(searchUser(keyword));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "16px" }}>
      <Box
        sx={{
          margin: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ fontWeight: "600", fontSize: "20px" }}>List of user</Box>

        <Box sx={{ display: "flex", gap: "8px" }}>
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
          >
            <FilterListIcon />
            Filters
          </Button>

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
            onClick={handleClickAdd}
          >
            <AddIcon sx={{ marginLeft: "-7px" }} />
            Add new member
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />

      <Box
        sx={{
          margin: "16px 20px",
          display: "flex",
          gap: "24px",
        }}
      >
        <TextField
          placeholder="Search for question ID, other keywords"
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
            },
          }}
          sx={{
            width: "90%",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E0E0E0 !important",
            },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
        />

        <Button
          variant="contained"
          sx={{
            bgcolor: "#0F8EEF",
            borderRadius: "12px",
            color: "#000",
            fontWeight: "600",
            textTransform: "none",
            width: "10%",
            height: "36.5px",
            "&:hover": {
              bgcolor: "#0C80D8",
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    backgroundColor: "#E1E6E9",
                    fontWeight: "600",
                    minWidth: column.minWidth,
                    p: 1,
                    paddingLeft: 2,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {mappedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Not exist record
                </TableCell>
              </TableRow>
            ) : (
              mappedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof Data];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.render
                            ? column.render(row)
                            : value instanceof Date
                              ? format(value, "dd MMM yyyy 'at' h:mm a")
                              : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {open && selectedUser && (
        <DeleteDialog
          open={open}
          onClose={handleClose}
          userId={selectedUser?.userId}
        />
      )}

      <CreateMemberDialog open={openAdd} onClose={handleCloseAdd} />

      <UserDetailsDrawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        user={selectedUser}
      />

      <UserDetailsDrawer
        open={openDrawerEdit}
        onClose={handleCloseDrawerEdit}
        user={selectedUser}
        edit={true}
      />
    </Paper>
  );
}

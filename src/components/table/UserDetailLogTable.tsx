import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import { Avatar, Box } from "@mui/material";

import { format } from "date-fns";

import { deepOrange } from "@mui/material/colors";

interface Column {
  id: "timer" | "type" | "action";
  label: string;
  minWidth?: string;
  align?: "right" | "center";
  render?: (row: Data) => React.ReactNode;
}

interface Data {
  fullName: string;
  createAt: Date;
  type: string;
  action: string;
}

const rows: Data[] = [
  {
    createAt: new Date("2020-05-15"),
    fullName: "Justin Nguyen",
    type: "User management",
    action: "Email is changed",
  },
  {
    createAt: new Date("2020-05-15"),
    fullName: "Sunny Nguyen",
    type: "User management",
    action: "Email is changed",
  },
  {
    createAt: new Date("2020-05-15"),
    fullName: "Henry Nguyen",
    type: "User management",
    action: "Email is changed",
  },
];

export default function UserDetailLogTable() {
  const columns: readonly Column[] = [
    {
      id: "timer",
      label: "TIMER",
      minWidth: "40%",

      render: (row: Data) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                fontSize: "16px",
                width: "30px",
                height: "30px",
              }}
            >
              {row.fullName.charAt(0)}
            </Avatar>

            <Box>
              <Box>{row.fullName}</Box>
              <Box sx={{ color: "#BCAAAA" }}>
                {format(row.createAt, "MMM dd, yyyy 'at' hh:mm aa")}
              </Box>
            </Box>
          </Box>
        );
      },
    },

    {
      id: "type",
      label: "TYPE",
      minWidth: "30%",
    },
    { id: "action", label: "ACTION", minWidth: "30%" },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "16px" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: "#E1E6E9",
                    fontWeight: "600",
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
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.fullName}>
                {columns.map((column) => {
                  const value = row[column.id as keyof Data];

                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.render ? column.render(row) : String(value)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

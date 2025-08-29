import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import { format } from "date-fns";
import type { Member } from "../interface/Member";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveMemberDialog from "../dialog/RemoveMemberDialog";
import { useState } from "react";

interface MemberTableProps {
  members: Member[];
  projectId: string;
}

export const MemberTable = ({ members, projectId }: MemberTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectMember, setSelectMember] = useState("");

  const handleClickOpen = (id: string) => {
    setOpen(true);
    console.log("id", id);
    setSelectMember(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#E1E6E9" }}>
              <TableCell sx={{ width: "50%" }}>ID</TableCell>
              <TableCell sx={{ width: "35%" }}>Joined Date</TableCell>
              <TableCell sx={{ width: "15%", textAlign: "center" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.length > 0 ? (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>
                    {format(new Date(member.joinedDate), "dd/MM/yyyy")}
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => handleClickOpen(member.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  Chưa có thành viên nào tham gia
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <RemoveMemberDialog
        open={open}
        onClose={handleClose}
        userId={selectMember}
        projectId={projectId}
      />
    </>
  );
};

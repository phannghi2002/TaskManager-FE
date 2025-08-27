// import { Box, TextField, Typography } from "@mui/material";

// export const RenderRoleRow = (edit: boolean) => {

//     if (edit) {
//         return (
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "row",
//                     gap: "8px",
//                     alignItems: "center",
//                     mb: 2,
//                     height: "40px",
//                 }}
//             >

//                 <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#555", width: "20%" }}>
//                     Role
//                 </Typography>

//                 <TextField // Dùng TextField để tận dụng styling của MUI Select
//                     select // Quan trọng: Biến TextField thành Select
//                     label=""
//                     value={formValue.role}
//                     onChange={(e) =>
//                         setFormValue({ ...formValue, role: e.target.value as UserRole })
//                     }
//                     variant="outlined"
//                     size="small"
//                     sx={{ width: "80%" }}
//                     InputProps={{ sx: { borderRadius: "12px", backgroundColor: "#fff", height: "100%" } }}
//                 >
//                     {ROLE_OPTIONS.map((role) => (
//                         <MenuItem key={role} value={role}>
//                             {role}
//                         </MenuItem>
//                     ))}
//                 </TextField>
//             </Box>
//         );
//     }

//     // 2. Chế độ Chỉ đọc (READ-ONLY MODE)
//     // Sử dụng UserDetailRow đã có sẵn logic Chip
//     return (
//         <UserDetailRow
//             label="Role"
//             value={<RoleChip role={formValue.role} />}
//             isComponent={true}
//         />
//     );
// };

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { deleteUser, getAllUser } from "../../actions/user/userActions";
import { toast } from "react-toastify";
import {
  deleteTask,
  getAllProject,
  removeMember,
} from "../../actions/project/projectActions";

interface RemoveTaskDialogProps {
  open: boolean;
  onClose: () => void; // Sử dụng kiểu hàm chính xác
  taskId: string;
  projectId: string;
}

export default function RemoveTaskDialog({
  open,
  onClose,
  taskId,
  projectId,
}: RemoveTaskDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            width: "35%",
            margin: "12px 20px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontWeight: "600",
          }}
        >
          Confirm delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task in project? This action
            can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ margin: "12px 20px", gap: "4px" }}>
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
              color: "#000",
              borderRadius: "12px",
              fontWeight: "600",
              "&:hover": {
                bgcolor: "#E1E6E9",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#0F8EEF",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "600",
              textTransform: "none",
              width: "10%",
              height: "36.5px",
              "&:hover": {
                bgcolor: "#0C80D8",
              },
            }}
            onClick={async () => {
              onClose();
              console.log("in", taskId, projectId);

              const result = await dispatch(deleteTask({ taskId, projectId }));
              console.log("kkk", result);

              if (result.code !== 1000) {
                toast.error(result.message);
              } else toast.success(result.message);
              onClose();
              await dispatch(getAllProject());
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

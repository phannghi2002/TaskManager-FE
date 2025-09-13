import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { clearMessage } from "../../actions/auth/authActions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
  createProject,
  getAllProject,
} from "../../actions/project/projectActions";

import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";

import dayjs from "dayjs";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Project name cannot be blank"),
  description: Yup.string().required("Description cannot be empty"),
  startDate: Yup.date().nullable().required("Start date cannot be blank"),
  endDate: Yup.date()
    .nullable()
    .required("End date cannot be blank")
    .min(Yup.ref("startDate"), "End Date must be after or equal to Start Date"),
});

export default function CreateProjectDialog({
  open,
  onClose,
}: CreateProjectDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { project } = useSelector((store: any) => store);

  const initialValues: FormData = {
    name: "",
    description: "",
    startDate: null,
    endDate: null,
  };

  const handleFormSubmit = async (
    values: FormData,
    { setSubmitting, resetForm }: FormikHelpers<FormData>
  ) => {
    try {
      const result = await dispatch(createProject(values));

      if (result.code === 1000) {
        toast.success("Create project successfully");
        onClose();
        resetForm();
        dispatch(getAllProject());
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred during project creation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
          mb: 1,
        }}
      >
        Add Project New
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    variant="outlined"
                    placeholder="PRO001"
                    sx={{ mb: 2, mt: 1 }}
                    value={values.name}
                    onChange={(e) => {
                      handleChange(e);
                      dispatch(clearMessage());
                    }}
                    onBlur={handleBlur}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    placeholder="Project manager "
                    variant="outlined"
                    sx={{ mb: 2 }}
                    value={values.description}
                    onChange={(e) => {
                      handleChange(e);
                      dispatch(clearMessage());
                    }}
                    onBlur={handleBlur}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />

                  <Box sx={{ width: "100%", paddingBottom: "16px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start Date"
                        value={values.startDate}
                        onChange={(newValue) => {
                          setFieldValue("startDate", newValue);
                          dispatch(clearMessage());
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: touched.startDate && !!errors.startDate,
                            helperText: touched.startDate && errors.startDate,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box sx={{ width: "100%", paddingBottom: "16px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="End Date"
                        value={values.endDate}
                        onChange={(newValue) => {
                          setFieldValue("endDate", newValue);
                          dispatch(clearMessage());
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: touched.endDate && !!errors.endDate,
                            helperText: touched.endDate && errors.endDate,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{ color: "red", textAlign: "center", pt: 1 }}>
                  {project.error}
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{ marginLeft: 2, marginRight: 2, mb: 2, gap: "4px" }}
            >
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
                type="submit"
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
              >
                Add
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

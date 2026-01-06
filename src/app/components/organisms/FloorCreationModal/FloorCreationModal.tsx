// FloorCreationModal.jsx - Beautiful Blue Theme
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LinkIcon from "@mui/icons-material/Link";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import WindowIcon from "@mui/icons-material/Window";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  p: 4,
  border: "2px solid",
  borderColor: "primary.light",
  backgroundImage: "linear-gradient(145deg, #ffffff 0%, #f8fbff 100%)",
};

const windowsTintOptions = [
  { value: "none", label: "No Tint", icon: "🔓" },
  { value: "light", label: "Light", icon: "☀️" },
  { value: "medium", label: "Medium", icon: "⛅" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "mirror", label: "Mirror", icon: "🪞" },
];

const colorOptions = [
  { value: "#e3f2fd", label: "Sky Blue" },
  { value: "#bbdefb", label: "Light Blue" },
  { value: "#90caf9", label: "Soft Blue" },
  { value: "#64b5f6", label: "Blue" },
  { value: "#42a5f5", label: "Bright Blue" },
  { value: "#2196f3", label: "Primary Blue" },
  { value: "#1e88e5", label: "Deep Blue" },
  { value: "#1565c0", label: "Navy Blue" },
  { value: "#ffffff", label: "White" },
  { value: "#f5f5f5", label: "Light Gray" },
  { value: "#c8e6c9", label: "Mint" },
  { value: "#fff9c4", label: "Cream" },
];

interface FloorCreationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (formData: {
    ownerName: string;
    message: string;
    link: string;
    color: string;
    windowsTint: string;
  }) => void;
}

export default function FloorCreationModal({
  open,
  onClose,
  onSubmit,
}: FloorCreationModalProps) {
  const [formData, setFormData] = React.useState({
    ownerName: "",
    message: "",
    link: "",
    color: "#e3f2fd", // Default to a nice blue
    windowsTint: "none",
  });

  const resetForm = () => {
    setFormData({
      ownerName: "",
      message: "",
      link: "",
      color: "#e3f2fd",
      windowsTint: "none",
    });
  };

  React.useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const handleChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="floor-creation-modal"
      aria-describedby="modal-for-creating-new-floor"
      sx={{
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(25, 118, 210, 0.1)",
      }}
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            pb: 2,
            borderBottom: "2px solid",
            borderColor: "primary.100",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <AddIcon />
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #1976d2, #2196f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Create New Floor
            </Typography>
          </Box>
          <Button
            onClick={onClose}
            sx={{
              minWidth: "auto",
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "grey.100",
              color: "grey.600",
              "&:hover": {
                bgcolor: "grey.200",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </Box>

        <Stack spacing={2.5}>
          <TextField
            required
            fullWidth
            label="Owner Name"
            value={formData.ownerName}
            onChange={handleChange("ownerName")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  borderWidth: 2,
                },
              },
            }}
            helperText="Who owns this floor?"
          />

          <TextField
            fullWidth
            label="Message"
            value={formData.message}
            onChange={handleChange("message")}
            multiline
            rows={2}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageIcon sx={{ color: "primary.main", mt: 1.5 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  borderWidth: 2,
                },
              },
            }}
            helperText="Optional welcome message"
          />

          <TextField
            fullWidth
            label="Link"
            value={formData.link}
            onChange={handleChange("link")}
            placeholder="https://example.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  borderWidth: 2,
                },
              },
            }}
            helperText="Optional website or social link"
          />

          <Box sx={{ position: "relative" }}>
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: -8,
                left: 12,
                bgcolor: "background.paper",
                px: 1,
                color: "primary.main",
                fontWeight: 600,
                zIndex: 1,
              }}
            >
              Design Options
            </Typography>
            <Stack spacing={2.5} sx={{ pt: 1 }}>
              <TextField
                select
                fullWidth
                label="Floor Color"
                value={formData.color}
                onChange={handleChange("color")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ColorLensIcon sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: 2,
                    },
                  },
                }}
              >
                {colorOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: option.value,
                          border: "2px solid",
                          borderColor:
                            formData.color === option.value
                              ? "primary.main"
                              : "grey.300",
                          borderRadius: "6px",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Typography variant="body2">{option.label}</Typography>
                      {option.value.includes("blue") && (
                        <Typography
                          variant="caption"
                          sx={{ ml: "auto", color: "primary.main" }}
                        >
                          ★
                        </Typography>
                      )}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Windows Tint"
                value={formData.windowsTint}
                onChange={handleChange("windowsTint")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WindowIcon sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: 2,
                    },
                  },
                }}
              >
                {windowsTintOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                        {option.icon}
                      </Typography>
                      <Typography variant="body2">{option.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>

          {formData.color && (
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: formData.color,
                border: "2px solid",
                borderColor: "primary.200",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: "grey.700",
                  letterSpacing: "0.5px",
                }}
              >
                ✨ COLOR PREVIEW ✨
              </Typography>
            </Box>
          )}

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                borderRadius: "10px",
                px: 3,
                py: 1,
                borderColor: "grey.300",
                color: "grey.700",
                "&:hover": {
                  borderColor: "primary.light",
                  bgcolor: "primary.50",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!formData.ownerName.trim()}
              startIcon={<AddIcon />}
              sx={{
                borderRadius: "10px",
                px: 3,
                py: 1,
                fontWeight: 600,
                background: "linear-gradient(45deg, #1976d2, #2196f3)",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  background: "linear-gradient(45deg, #1565c0, #1976d2)",
                  boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                },
                "&.Mui-disabled": {
                  background: "grey.300",
                },
              }}
            >
              Create Floor
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

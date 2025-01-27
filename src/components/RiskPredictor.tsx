import { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

export default function RiskPredictorDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        backgroundColor: grey[900], // Light grey background
      }}
      id="dialog"
    >
      <DialogTitle>
        <Typography variant="h4">Risk Predictor</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: grey[900],
        }}
      >
        <DialogContentText>
          <Typography variant="body1">
            Please provide the deatils of the user to get the prediction of
            payment default.
          </Typography>
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

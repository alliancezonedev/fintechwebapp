"use client";
import { useState } from "react";
import Grid2 from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
  usePredictionQuery,
  useUserDataQuery,
  useUsersQuery,
} from "@/reduxSlice/apiSlice";
import {
  getEducationString,
  getMaritalStatusString,
  getSexString,
  PaymentDefault,
} from "@/appConstants";

function DataBox({
  dataKey,
  dataValue,
  isLoading,
}: {
  dataKey: string;
  dataValue: string;
  isLoading: boolean;
}) {
  return (
    <Grid2
      container
      size={{ xs: 3 }}
      py={5}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ backgroundColor: grey[900] }}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
      >
        {dataKey}:
      </Typography>
      {isLoading ? (
        <CircularProgress disableShrink size={30} sx={{ ml: 3 }} />
      ) : (
        <Typography pl={3} variant="body1">
          {dataValue}
        </Typography>
      )}
    </Grid2>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const [userId, setUserId] = useState("");
  const [predictionUserId, setPredictionUserId] = useState("");
  const { data: users } = useUsersQuery();
  const { data: userData, isFetching } = useUserDataQuery(
    { userId: parseInt(userId, 10) },
    {
      skip: userId === "" || userId === undefined || userId === null,
    },
  );

  const { data: userPrediction, isFetching: isPredictionLoading } =
    usePredictionQuery(
      { userId: parseInt(predictionUserId, 10) },
      {
        skip:
          predictionUserId === "" ||
          predictionUserId === undefined ||
          predictionUserId === null,
      },
    );
  const [predictionDialogOpen, setPredictionDialogOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setUserId(event.target.value as string);
  };

  const onPredictionButtonClick = () => {
    setPredictionUserId(userId);
    setPredictionDialogOpen(true);
  };

  return (
    <Grid2 container size={{ xs: 12 }}>
      <Grid2 container size={{ xs: 12 }}>
        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: "#FFFFFF",
            }}
          >
            User
          </InputLabel>
          <Select
            labelId="select-user"
            id="select-user"
            value={userId}
            label="User"
            onChange={handleChange}
            sx={{
              backgroundColor: grey[900],
              color: "#FFFFFF",
            }}
          >
            {(users || []).map((user) => (
              <MenuItem
                value={`${user.USER_ID}`}
                sx={{
                  backgroundColor: grey[900],
                  color: "#FFFFFF",
                }}
              >
                {user.USER_NAME}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 container size={{ xs: 12 }} mt={3}>
        <Typography variant="h5">User Details</Typography>
      </Grid2>
      {userData ? (
        <>
          <Grid2 container size={{ xs: 12 }} mt={2} spacing={2}>
            <DataBox
              dataKey={"Name"}
              dataValue={userData.USER_NAME}
              isLoading={isFetching}
            />
            <DataBox
              dataKey={"Age"}
              dataValue={userData.AGE + ""}
              isLoading={isFetching}
            />
            <DataBox
              dataKey={"Gender"}
              dataValue={getSexString(userData.SEX)}
              isLoading={isFetching}
            />
            <DataBox
              dataKey={"Education"}
              dataValue={getEducationString(userData.EDUCATION)}
              isLoading={isFetching}
            />
            <DataBox
              dataKey={"Marital Status"}
              dataValue={getMaritalStatusString(userData.MARITALSTATUS)}
              isLoading={isFetching}
            />
            <Grid2
              container
              size={{ xs: 3 }}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ backgroundColor: grey[900] }}
            >
              <Button
                variant="contained"
                sx={{ height: "100%" }}
                fullWidth
                onClick={() => {
                  onPredictionButtonClick();
                }}
              >
                Get Default Prediction
              </Button>
            </Grid2>
          </Grid2>
          <Grid2 container size={{ xs: 12 }} mt={3}>
            <Divider
              sx={{
                backgroundColor: "#FFFFFF",
                width: "100%",
                color: "#FFFFFF",
              }}
            />
          </Grid2>
          <Grid2 container size={{ xs: 12 }} mt={3}>
            <Typography variant="h5">Payment History</Typography>
          </Grid2>
          <Grid2 container size={{ xs: 12 }} mt={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Month</StyledTableCell>
                    <StyledTableCell align="center">
                      Bill Amount
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Paid Amount
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Payment Delay
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {userData.PAYMENT_DATA.map((payment) => (
                    <StyledTableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {payment.MONTH}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {payment.BILL_AMT}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {payment.PAID_AMT}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {payment.PAYMENTDELAY}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
          <Dialog
            onClose={() => {
              setPredictionDialogOpen(false);
            }}
            open={predictionDialogOpen}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: grey[900],
                color: "#FFFFFF",
              },
            }}
          >
            <DialogTitle>Default Prediction</DialogTitle>
            <DialogContent>
              {isPredictionLoading ? (
                <Grid2 container size={{ xs: 12 }} mt={2}>
                  <Typography variant="body1">
                    Getting Prediction for User: {predictionUserId}
                  </Typography>
                  <CircularProgress disableShrink size={30} sx={{ ml: 3 }} />
                </Grid2>
              ) : (
                <>
                  <Grid2 container size={{ xs: 12 }} mt={2}>
                    {userPrediction?.PREDICTION === PaymentDefault.YES ? (
                      <Typography variant="body1" sx={{ color: "red" }}>
                        This user is likely to default on their payment.
                      </Typography>
                    ) : (
                      <Typography variant="body1" sx={{ color: "#1fb872" }}>
                        This user is likely to pay their payment on time.
                      </Typography>
                    )}
                  </Grid2>
                  <Grid2 container size={{ xs: 12 }} mt={2}>
                    <Typography variant="body1">
                      Confidence = {userPrediction?.CONFIDENCE}
                    </Typography>
                  </Grid2>
                </>
              )}
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Grid2 container mt={3}>
          <Typography>Please select a user to get info</Typography>
        </Grid2>
      )}
    </Grid2>
  );
}

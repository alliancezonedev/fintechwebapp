"use client";
import { useState } from "react";
import Grid2 from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

function DataBox({
  dataKey,
  dataValue,
}: {
  dataKey: string;
  dataValue: string;
}) {
  return (
    <Grid2
      container
      size={{ xs: 3 }}
      py={5}
      justifyContent={"center"}
      sx={{ backgroundColor: grey[900] }}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
      >
        {dataKey}:
      </Typography>
      <Typography pl={3} variant="body1">
        {dataValue}
      </Typography>
    </Grid2>
  );
}

function createData(
  month: string,
  billAmt: number,
  paidAmt: number,
  paymentDelay: number,
) {
  return { key: month, month, billAmt, paidAmt, paymentDelay };
}

const rows = [
  createData("April", 159, 6.0, 24),
  createData("May", 237, 9.0, 37),
  createData("June", 262, 16.0, 24),
  createData("July", 305, 3.7, 67),
  createData("August", 356, 16.0, 49),
];

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
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Grid2 container size={{ xs: 12 }}>
      <Grid2 container size={{ xs: 12 }}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color: "#FFFFFF",
            }}
          >
            User
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            sx={{
              backgroundColor: grey[900],
            }}
          >
            <MenuItem value={10}>John</MenuItem>
            <MenuItem value={20}>Vohn</MenuItem>
            <MenuItem value={30}>Mohn</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 container size={{ xs: 12 }} mt={3}>
        <Typography variant="h5">User Details</Typography>
      </Grid2>
      <Grid2 container size={{ xs: 12 }} mt={2} spacing={2}>
        <DataBox dataKey={"Name"} dataValue="John" />
        <DataBox dataKey={"Age"} dataValue="30" />
        <DataBox dataKey={"Gender"} dataValue="Male" />
        <DataBox dataKey={"Education"} dataValue="Graduate" />
        <DataBox dataKey={"Marital Status"} dataValue="Married" />
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
                <StyledTableCell align="center">Bill Amount</StyledTableCell>
                <StyledTableCell align="center">Paid Amount</StyledTableCell>
                <StyledTableCell align="center">Payment Delay</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.month}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.billAmt}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.paidAmt}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.paymentDelay}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </Grid2>
  );
}

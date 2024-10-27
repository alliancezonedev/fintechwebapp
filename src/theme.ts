"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      color: "#FFFFFF",
    },
    h1: {
      fontFamily: ["Poppins SemiBold", "sans-serif"].join(","),
    },
    h2: {
      fontFamily: ["Poppins SemiBold", "sans-serif"].join(","),
    },
    h3: {
      fontFamily: ["Poppins SemiBold", "sans-serif"].join(","),
    },
    h4: {
      fontFamily: ["Poppins SemiBold", "sans-serif"].join(","),
      fontSize: "1.8rem",
    },
  },
});
export default responsiveFontSizes(theme);

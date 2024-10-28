"use client";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import theme from "../theme";
import "../styles/globals.css";
import RiskPredictorDialog from "@/components/RiskPredictor";

const ReduxProvider = dynamic(() => import("../clientProviders"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [openRiskPredictorDialog, setOpenRiskPredictorDialog] =
    useState<boolean>(false);

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ReduxProvider>
              <CssBaseline />
              <AppBar
                position="fixed"
                sx={{
                  width: { sm: "100%" },
                  backgroundColor: "#1fb872",
                }}
              >
                <Toolbar>
                  <Grid2
                    container
                    size={{ xs: 12 }}
                    sx={{ width: "100%" }}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid2>
                      <Typography variant="h6" noWrap component="div">
                        Risk Radar
                      </Typography>
                    </Grid2>
                    <Grid2>
                      <Button
                        sx={{
                          display: "none",
                        }}
                        variant="contained"
                        onClick={() => {
                          setOpenRiskPredictorDialog(true);
                        }}
                      >
                        Create User
                      </Button>
                    </Grid2>
                  </Grid2>
                </Toolbar>
              </AppBar>
              <Box
                id="test"
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 7,
                  backgroundColor: "black",
                  width: { sm: "100%" },
                  minHeight: "100vh",
                }}
              >
                <Toolbar />
                {children}
                <RiskPredictorDialog
                  open={openRiskPredictorDialog}
                  setOpen={setOpenRiskPredictorDialog}
                />
              </Box>
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

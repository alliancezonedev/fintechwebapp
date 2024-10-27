"use client";
import dynamic from "next/dynamic";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import PeopleIcon from "@mui/icons-material/People";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Typography from "@mui/material/Typography";
import theme from "../theme";
import "../styles/globals.css";
import { ReactNode, useState } from "react";
import { grey } from "@mui/material/colors";

const ReduxProvider = dynamic(() => import("../clientProviders"), {
  ssr: false,
});

const drawerWidth = 240;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          {
            name: "User Profiles",
            icon: PeopleIcon,
          },
          { name: "Default Risk", icon: CreditScoreIcon },
        ].map((entry) => (
          <ListItem dataKey={entry.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <entry.icon sx={{ color: "#FFFFFF" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" color="#FFFFFF">
                  {entry.name}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
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
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                  ml: { sm: `${drawerWidth}px` },
                  backgroundColor: "#1fb872",
                }}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                    Default Sense
                  </Typography>
                </Toolbar>
              </AppBar>
              <Grid2 container size={{ xs: 12 }} flexDirection={"row"}>
                <Box
                  component="nav"
                  sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                    height: "100vh",
                  }}
                  aria-label="nav-bar"
                >
                  {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                  <Drawer
                    // container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                      display: { xs: "block", sm: "none" },
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                    }}
                    PaperProps={{
                      sx: {
                        backgroundColor: grey[900],
                      },
                    }}
                  >
                    {drawer}
                  </Drawer>
                  <Drawer
                    variant="permanent"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                      },
                    }}
                    PaperProps={{
                      sx: {
                        backgroundColor: grey[900],
                      },
                    }}
                    open
                  >
                    {drawer}
                  </Drawer>
                </Box>
                <Box
                  id="test"
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: "black",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    minHeight: "100vh",
                  }}
                >
                  <Toolbar />
                  {children}
                </Box>
              </Grid2>
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

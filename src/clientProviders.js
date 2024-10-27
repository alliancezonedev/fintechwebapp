"use client";

import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import store from "./store";

export default function ClientProviders({ children }) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </Provider>
  );
}
ClientProviders.propTypes = {
  children: PropTypes.node,
};

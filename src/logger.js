// this is the logger for the browser
import pino from "pino";

const config = {
  serverUrl: "",
};

const pinoConfig = {
  browser: {
    asObject: true,
    write: (o) => {
      console.log(`${o.level}:${o.msg}`);
    },
  },
};

if (config.serverUrl) {
  pinoConfig.browser.transmit = {
    level: "info",
    // send: (level, logEvent) => {
    //   const msg = logEvent.messages[0];

    //   const headers = {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers":
    //       "Origin, X-Requested-With, Content-Type, Accept",
    //     type: "application/json",
    //   };
    //   const blob = new Blob([JSON.stringify({ msg, level })], headers);
    //   navigator.sendBeacon(`${config.serverUrl}/log`, blob);
    // },
  };
}

const logger = pino(pinoConfig);

export default logger;

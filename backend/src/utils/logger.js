const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize({
      colors: {
        info: "dim blue",
        error: "bold red cyanBG",
      },
    }),
    winston.format.json()
    // winston.format.timestamp()
  ),

  // defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV == "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;

const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

let dir = "logger";

// Create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

const logLevel = "dev" === 'dev' ? 'debug' : 'warn';

const options = {
  file: {
    level                          : logLevel,
    filename                       : dir + '/%DATE%.log',
    datePattern                    : 'YYYY-MM-DD',
    zippedArchive                  : true,
    timestamp                      : true,
    handleExceptions               : true,
    humanReadableUnhandledException: true,
    prettyPrint                    : true,
    json                           : true,
    maxSize                        : '20m',
    colorize                       : true,
    maxFiles                       : '14d',
  },
};

module.exports = createLogger({
  transports: [
    new DailyRotateFile(options.file)
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // Do not exit on handled exceptions
});

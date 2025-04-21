class Logger {
  private static instance: Logger;
  private isDebug: boolean = __DEV__;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(
    level: string,
    message: string,
    ...args: any[]
  ): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.length ? JSON.stringify(args, null, 2) : "";

    // Add colors for better visibility
    const levelColor =
      {
        INFO: "\x1b[36m", // Cyan
        ERROR: "\x1b[31m", // Red
        WARN: "\x1b[33m", // Yellow
        DEBUG: "\x1b[35m", // Magenta
      }[level] || "\x1b[0m";

    const resetColor = "\x1b[0m";

    return `${levelColor}[${timestamp}] [${level}] ${message}${resetColor}\n${formattedArgs}`;
  }

  log(message: string, ...args: any[]): void {
    if (this.isDebug) {
      const formattedMessage = this.formatMessage("INFO", message, ...args);
      console.log(formattedMessage);
    }
  }

  error(message: string, ...args: any[]): void {
    const formattedMessage = this.formatMessage("ERROR", message, ...args);
    console.error(formattedMessage);
  }

  warn(message: string, ...args: any[]): void {
    if (this.isDebug) {
      const formattedMessage = this.formatMessage("WARN", message, ...args);
      console.warn(formattedMessage);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.isDebug) {
      const formattedMessage = this.formatMessage("DEBUG", message, ...args);
      console.debug(formattedMessage);
    }
  }
}

export const logger = Logger.getInstance();

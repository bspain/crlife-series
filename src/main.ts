import * as http from 'http';
import { config as Config } from './config/Config';
import Logger from './logger';

const logger = new Logger();

const { app, config } = Config(logger);

console.log(`Process env APP_ENV: ${process.env.APP_ENV}`);
console.log(`Process env DEBUG: ${process.env.DEBUG}`);
console.log(`meta : ${config.get('meta')}`);
console.log(`azure_storage: ${config.get('azure_storage')}`);

// Setup App
const httpServer = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: { code: string; syscall?: string }): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const httpPort = app.get('port');
  const bind = typeof httpPort === 'string' ? 'Pipe ' + httpPort : 'Port ' + httpPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  logger.debug('SERVER', 'Listening on ' + bind);
}

// Register app listener events
httpServer.on('error', onError);
httpServer.on('listening', onListening);
httpServer.listen(config.get('port'));

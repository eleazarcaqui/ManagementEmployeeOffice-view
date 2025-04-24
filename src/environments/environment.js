const ENV = process.env.NODE_ENV || 'development';

let exportedEnvironment;

if (ENV === 'production') {
  exportedEnvironment = require('./environment.production.js').environment;
} else {
  exportedEnvironment = {
    production: false,
    apiUrl: 'http://localhost:8081/api',
    authUrl: 'http://localhost:8081/auth',
    appName: 'Employee and Office Assignment System - DEV'
  };
}

export const environment = exportedEnvironment;
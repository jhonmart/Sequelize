const swaggerAutogen = require('swagger-autogen')();
const path = require('path');

const outputFile = path.resolve(__dirname, 'swagger_output.json');
const endpointsFiles = [path.resolve(__dirname, '..', 'index.js')];

swaggerAutogen(outputFile, endpointsFiles);
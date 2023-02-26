/*
============================================
; Title:        index.js
; Author:       David Rachwalik
; Date:         2022/08/19
; Description:  Express server for main application
;===========================================
*/

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const EmployeeAPI = require('./routes/employee-api');

/*
 * -------- Database Configurations --------
 */

// Build database connection string (https://www.urlencoder.org)
const dbUsername = 'nodebucket_user';
const dbPassword = 'kl9DpuKH7Dqgkw7V';
const srvAddress = 'buwebdev-cluster-1.gfevl.mongodb.net';
const dbName = 'nodebucket';
const CONN = `mongodb+srv://${dbUsername}:${dbPassword}@${srvAddress}/${dbName}?retryWrites=true&w=majority`;

// Establish database connection
mongoose
  .connect(CONN)
  .then(() => {
    console.log(`Successfully connected to '${dbName}' in MongoDB!`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

/*
 * -------- Application Server Configurations --------
 */

// Initialize Express app server
const app = express();

// --- Configure middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
// app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));
app.use(
  express.static(path.join(__dirname, '../client-angular/dist/nodebucket')),
);
app.use(
  '/',
  express.static(path.join(__dirname, '../client-angular/dist/nodebucket')),
);

// Configure OpenAPI/Swagger document library specification (https://swagger.io/specification)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'nodebucket API',
      version: '1.0.0',
      description:
        'Project API for WEB 450 - Mastering the MEAN Stack Bootcamp (Bellevue University).',
      contact: {
        name: 'David Rachwalik',
        url: 'https://david-rachwalik.github.io',
      },
      // https://soos.io/apache-vs-mit-license
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
  },
  apis: ['./server/routes/*.js'], // Files containing annotations for the OpenAPI Specification
};
const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Configure middleware for API routing
app.use('/api/employees', EmployeeAPI);

// --- Start the Express server ---
const PORT = process.env.PORT || 3000; // Default server port value
app.listen(PORT, () => {
  console.log(`Application started and listening on PORT: ${PORT}`);
});

/*
============================================
; Title:        index.js
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Express server for main application
;===========================================
*/

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const EmployeeAPI = require("./routes/employee-api.js");

/*
 * -------- Database Configurations --------
 */

// Database connection string
const db_username = "nodebucket_user";
const db_password = "kl9DpuKH7Dqgkw7V";
const db_name = "nodebucket";
const CONN = `mongodb+srv://${db_username}:${db_password}@buwebdev-cluster-1.gfevl.mongodb.net/${db_name}?retryWrites=true&w=majority`;

// Establish database connection
mongoose
  .connect(CONN)
  .then(() => {
    console.log("Connection to the database was successful");
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

/*
 * -------- Application Server Configurations --------
 */

const app = express(); // Express variable

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));
// Add database API routes
app.use("/api/employees", EmployeeAPI);

// Wire-up the Express server
const PORT = 3000 || process.env.PORT; // Default server port value
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});

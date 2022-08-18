/*
============================================
; Title:        employee-api.js
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  API route for Employee documents
;===========================================
*/

const express = require("express");
const Employee = require("../models/employee.js");

const router = express.Router();

// -------- API --------

// findEmployeeById
router.get("/:empId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, emp) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          err: "MongoDB Server Error: " + err.message,
        });
      } else {
        console.log(emp);
        // Record found - return as response
        res.json(emp);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      err: "Internal server error!",
    });
  }
});

module.exports = router;

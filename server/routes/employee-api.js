/*
============================================
; Title:        employee-api.js
; Author:       David Rachwalik
; Date:         2022/08/19
; Description:  API route for Employee documents
;===========================================
*/

const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.js');

// -------- API --------

// operations: findEmployeeById

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     tags:
 *       - Employees
 *     description: API for returning an Employee document
 *     summary: returns an Employee document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/:empId', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, emp) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          err: 'MongoDB Server Error: ' + err.message,
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
      err: 'Internal server error!',
    });
  }
});

module.exports = router;

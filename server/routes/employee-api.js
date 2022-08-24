/*
============================================
; Title:        employee-api.js
; Author:       David Rachwalik
; Date:         2022/08/19
; Description:  API route for Employee documents
;===========================================
*/

const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

// -------- API --------

// operations: findAllEmployees, findEmployeeById, createEmployee, updateEmployeeById, deleteEmployeeById

/**
 * findAllEmployees
 * @openapi
 * /api/employees:
 *   get:
 *     tags:
 *       - Employees
 *     summary: return a list of Employee documents
 *     description: API for returning an array of all Employee documents.
 *     responses:
 *       '200':
 *         description: Employee documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('', async (req, res) => {
  try {
    Employee.find({}, (err, employees) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err.message}`,
        });
      } else {
        // Successfully found documents
        console.log(employees);
        res.json(employees);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Server Exception: ${err.message}`,
    });
  }
});

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   get:
 *     tags:
 *       - Employees
 *     summary: return an Employee document
 *     description:  API for returning an Employee document.
 *     parameters:
 *       - name: empId
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
    Employee.findOne({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err.message}`,
        });
      } else {
        // Successfully found document
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Server Exception: ${err.message}`,
    });
  }
});

/**
 * createEmployee
 * @openapi
 * /api/employees:
 *   post:
 *     tags:
 *       - Employees
 *     summary: create an Employee document
 *     description: API for adding a new Employee document.
 *     requestBody:
 *       description: Employee information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - empId
 *             properties:
 *               empId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Employee document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post('', async (req, res) => {
  try {
    const newEmployee = {
      empId: req.body.empId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    Employee.create(newEmployee, (err, employee) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err.message}`,
        });
      } else {
        // Successfully created document
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Server Exception: ${err.message}`,
    });
  }
});

/**
 * updateEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   put:
 *     tags:
 *       - Employees
 *     summary: update an Employee document
 *     description: API for updating an Employee document.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Employee information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - empId
 *             properties:
 *               empId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Employee document.
 *       '401':
 *         description: Invalid 'employeeId' provided.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.put('/:empId', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err.message}`,
        });
      } else {
        console.log(employee);
        if (employee) {
          // Assign new values to document
          employee.set({
            empId: req.body.empId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          });
          // Commit the changes to database
          employee.save((error, updatedEmployee) => {
            if (error) {
              console.log(error);
              res.json(updatedEmployee);
            } else {
              // Successfully updated document
              console.log(updatedEmployee);
              res.json(updatedEmployee);
            }
          });
        } else {
          console.log('Invalid employeeId');
          res.status(401).send({
            message: `Invalid employeeId`,
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Server Exception: ${err.message}`,
    });
  }
});

/**
 * deleteEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   delete:
 *     tags:
 *       - Employees
 *     summary: remove an Employee document
 *     description: API for deleting an Employee document.
 *     parameters:
 *       - name: empId
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
router.delete('/:empId', async (req, res) => {
  try {
    Employee.findByIdAndDelete({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err.message}`,
        });
      } else {
        // Successfully deleted document
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Server Exception: ${err.message}`,
    });
  }
});

// -------- Item Tasks --------

/**
 * findAllTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     summary: return a list of Employee task documents
 *     description: API for returning an array of all Employee task documents.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee task documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne(
      { empId: req.params.empId },
      'empId todo done',
      (err, employee) => {
        if (err) {
          console.log(err);
          res.status(501).send({
            err: `MongoDB server error: ${err.message}`,
          });
        } else {
          console.log(employee);
          res.json(employee);
        }
      },
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      err: `Internal server error: ${e.message}`,
    });
  }
});

/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     summary: create an Employee task document
 *     description: API for creating an Employee task document.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee task documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          err: `MongoDB server error: ${err.message}`,
        });
      } else {
        // Successfully found Employee document
        console.log(employee);
        // Generate new task and add to ToDos
        const newTask = {
          text: req.body.text,
        };
        employee.todo.push(newTask);
        employee.save((error, updatedEmp) => {
          if (error) {
            console.log(error);
            res.status(501).send({
              err: `MongoDB server error: ${error.message}`,
            });
          } else {
            // Successfully created document
            console.log(updatedEmp);
            res.json(updatedEmp);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      err: `Internal server error: ${e.message}`,
    });
  }
});

module.exports = router;

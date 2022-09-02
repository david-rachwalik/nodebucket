/*
============================================
; Title:        employee-api.js
; Author:       David Rachwalik
; Date:         2022/09/02
; Description:  API route for Employee documents
;===========================================
*/

const express = require('express');
const Employee = require('../models/employee');
const logResponse = require('../data/baseResponse');

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
        // console.log(err);
        // res.status(501).send({
        //   message: `MongoDB Exception: ${err.message}`,
        // });
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        // Successfully found documents
        const response = logResponse(200, employees);
        res.json(response);
      }
    });
  } catch (err) {
    // console.log(err);
    // res.status(500).send({
    //   message: `Server Exception: ${err.message}`,
    // });
    const response = logResponse(500, err);
    res.status(500).send(response);
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
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        // Successfully found document
        const response = logResponse(200, employee);
        res.json(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
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
    // Attempt to create new Employee document
    Employee.create(newEmployee, (err, employee) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        // Successfully created document
        const response = logResponse(200, employee);
        res.json(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
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
 *       '400':
 *         description: Invalid parameter provided.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.put('/:empId', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else if (employee) {
        // Successfully found document by id
        console.log(employee);
        // Assign new values to document
        employee.set({
          empId: req.body.empId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        // Commit the changes to database
        employee.save((error, updatedEmployee) => {
          if (error) {
            const response = logResponse(501, error);
            res.status(501).send(response);
          } else {
            // Successfully updated document
            const response = logResponse(200, updatedEmployee);
            res.json(response);
          }
        });
      } else {
        const response = logResponse(400, { empId: req.params.empId });
        res.status(400).send(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
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
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        // Successfully deleted document
        const response = logResponse(200, employee);
        res.json(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
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
          const response = logResponse(501, err);
          res.status(501).send(response);
        } else {
          const response = logResponse(200, employee);
          res.json(response);
        }
      },
    );
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
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
 *       '400':
 *         description: Invalid parameter provided.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else if (employee) {
        // Successfully found Employee document
        console.log(employee);
        // Generate new task and add to ToDos
        const newTask = {
          text: req.body.text,
        };
        employee.todo.push(newTask);
        employee.save((error, updatedEmp) => {
          if (error) {
            const response = logResponse(501, error);
            res.status(501).send(response);
          } else {
            // Successfully created document
            const response = logResponse(200, updatedEmp);
            res.json(response);
          }
        });
      } else {
        const response = logResponse(400, { empId: req.params.empId });
        res.status(400).send(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
  }
});

/**
 * updateTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     summary: update all Employee task documents
 *     description: API for batch updating all Employee task documents.
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
 *               - todo
 *               - done
 *             properties:
 *               todo:
 *                 type: array
 *               done:
 *                 type: array
 *     responses:
 *       '200':
 *         description: Employee task document.
 *       '400':
 *         description: Invalid parameter provided.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.put('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else if (employee) {
        // Successfully found document by id
        console.log(employee);
        // Assign new values to document
        employee.set({
          todo: req.body.todo,
          done: req.body.done,
        });
        // Commit the changes to database
        employee.save((error, updatedEmployee) => {
          if (error) {
            const response = logResponse(501, error);
            res.status(501).send(response);
          } else {
            // Successfully updated document
            const response = logResponse(200, updatedEmployee);
            res.json(response);
          }
        });
      } else {
        const response = logResponse(400, { empId: req.params.empId });
        res.status(400).send(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
  }
});

/**
 * deleteTask
 * @openapi
 * /api/employees/{empId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     summary: remove an Employee task document
 *     description: API for deleting an Employee task document.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: Employee task document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee document.
 *       '400':
 *         description: Invalid parameter provided.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.delete('/:empId/tasks/:taskId', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else if (employee) {
        // Successfully found document by id
        console.log(employee);
        // Assign new values to document
        const { taskId } = req.params;
        const todoItem = employee.todo.find((i) => String(i._id) === taskId);
        const doneItem = employee.done.find((i) => String(i._id) === taskId);

        if (todoItem || doneItem) {
          if (todoItem) {
            // --- ToDo Items ---
            employee.todo.id(todoItem._id).remove();
          } else {
            // --- Done Items ---
            employee.todo.id(doneItem._id).remove();
          }
          // Commit the changes to database
          employee.save((error, updatedEmployee) => {
            if (error) {
              const response = logResponse(501, error);
              res.status(501).send(response);
            } else {
              // Successfully updated document
              const response = logResponse(200, updatedEmployee);
              res.json(response);
            }
          });
        } else {
          const response = logResponse(400, { taskId });
          res.status(400).send(response);
        }
      } else {
        const response = logResponse(400, { empId: req.params.empId });
        res.status(400).send(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
  }
});

module.exports = router;

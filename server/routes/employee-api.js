/*
============================================
; Title:        employee-api.js
; Author:       David Rachwalik
; Date:         2022/08/19
; Description:  API route for Employee documents
;===========================================
*/

const express = require('express');
const BaseResponse = require('../models/base-response');
const Employee = require('../models/employee');
// const baseResponse = require('../data/baseResponse');
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

        // const response = baseResponse(501, 'MongoDB server error', err);
        const response = logResponse(501, err);
        res.status(501).send(response);

        // const deleteTaskMongoErrorResponse = new BaseResponse(
        //   '501',
        //   'MongoDB server error',
        //   err,
        // );
        // console.log(deleteTaskMongoErrorResponse.toObject());
        // res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        // Successfully found documents
        // console.log(employees);
        // res.json(employees);

        // baseResponse(200, 'Query success. ', employees);
        const response = logResponse(200, employees);
        res.json(response);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Server Exception: ${err.message}`,
    });

    // const response = baseResponse(500, 'Internal Server Error', err);
    // res.status(500).send(response);
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

/**
 * updateTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     summary: update an Employee task document
 *     description: API for updating an Employee task document.
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
 *       '401':
 *         description: Invalid 'employeeId' provided.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.put('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, employee) => {
      if (err) {
        const updateTasksCatchError = new BaseResponse(
          '501',
          'MongoDB server error',
          err,
        );
        console.log(updateTasksCatchError.toObject());
        res.status(501).send(updateTasksCatchError.toObject());

        // console.log(err);
        // res.status(501).send({
        //   message: `MongoDB Exception: ${err.message}`,
        // });
      } else {
        console.log(employee);
        if (employee) {
          // Assign new values to document
          employee.set({
            todo: req.body.todo,
            done: req.body.done,
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
    const updateTasksCatchError = new BaseResponse(
      '500',
      'Internal server error',
      err,
    );
    console.log(updateTasksCatchError.toObject());
    res.status(500).send(updateTasksCatchError.toObject());

    // res.status(500).send({
    //   message: `Server Exception: ${err.message}`,
    // });
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
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.delete('/:empId/tasks/:taskId', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, (err, emp) => {
      if (err) {
        const deleteTaskMongoErrorResponse = new BaseResponse(
          '501',
          'MongoDB server error',
          err,
        );
        console.log(deleteTaskMongoErrorResponse.toObject());
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());

        // console.log(err);
        // res.status(501).send({
        //   message: `MongoDB Exception: ${err.message}`,
        // });
      } else if (emp) {
        // Successfully found employee document
        console.log('---');
        console.log(emp);
        console.log('---');

        const { taskId } = req.params;

        const todoItem = emp.todo.find(
          (item) => item._id.toString() === taskId,
        );
        const doneItem = emp.done.find(
          (item) => item._id.toString() === taskId,
        );

        if (todoItem) {
          // --- ToDo Items ---
          emp.todo.id(todoItem._id).remove();

          emp.save((e, updatedTodoItemEmp) => {
            if (e) {
              const updatedTodoItemErrResponse = new BaseResponse(
                '501',
                'MongoDB server error',
                e,
              );
              console.log(updatedTodoItemErrResponse.toObject());
              res.status(501).send(updatedTodoItemErrResponse.toObject());
            } else {
              const updatedTodoItemSuccess = new BaseResponse(
                '200',
                'Query successful',
                updatedTodoItemEmp,
              );
              console.log(updatedTodoItemSuccess.toObject());
              res.status(200).send(updatedTodoItemSuccess.toObject());
            }
          });
        } else if (doneItem) {
          // --- Done Items ---
          emp.todo.id(doneItem._id).remove();

          emp.save((e, updatedDoneItemEmp) => {
            if (e) {
              const updatedDoneItemErrResponse = new BaseResponse(
                '501',
                'MongoDB server error',
                e,
              );
              console.log(updatedDoneItemErrResponse.toObject());
              res.status(501).send(updatedDoneItemErrResponse.toObject());
            } else {
              const updatedDoneItemSuccess = new BaseResponse(
                '200',
                'Query successful',
                updatedDoneItemEmp,
              );
              console.log(updatedDoneItemSuccess.toObject());
              res.status(200).send(updatedDoneItemSuccess.toObject());
            }
          });
        } else {
          const invalidTaskIdResponse = new BaseResponse(
            '300',
            'Invalid taskId. ',
            taskId,
          );
          console.log(invalidTaskIdResponse.toObject());
          res.status(300).send(invalidTaskIdResponse.toObject());
        }

        // res.json(emp);
      } else {
        // --- Employee not found ---
        const invalidEmployeeIdResponse = new BaseResponse(
          '300',
          'Invalid empId. ',
          req.params.empId,
        );
        console.log(invalidEmployeeIdResponse.toObject());
        res.status(300).send(invalidEmployeeIdResponse.toObject());
      }
    });
  } catch (err) {
    const deleteTaskErrorResponse = new BaseResponse(
      '500',
      'Internal server error',
      err,
    );
    console.log(deleteTaskErrorResponse.toObject());
    res.status(500).send(deleteTaskErrorResponse.toObject());

    // console.log(err);
    // res.status(500).send({
    //   message: `Server Exception: ${err.message}`,
    // });
  }
});

module.exports = router;

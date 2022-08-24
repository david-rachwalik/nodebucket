/*
============================================
; Title:        employee.js
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Model for Employee documents
;===========================================
*/

const mongoose = require('mongoose');
const itemSchema = require('./item');

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    // empId: { type: Number, unique: true, required: true },
    empId: { type: String, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [itemSchema],
    done: [itemSchema],
  },
  // Explicit collection naming
  { collection: 'employees' },
);

module.exports = mongoose.model('Employee', employeeSchema);

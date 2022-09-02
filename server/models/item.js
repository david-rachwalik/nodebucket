/*
============================================
; Title:        item.js
; Author:       David Rachwalik
; Date:         2022/08/22
; Description:  Schema for Item documents
;===========================================
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  text: { type: String },
});

module.exports = itemSchema;

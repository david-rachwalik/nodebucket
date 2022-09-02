/*
============================================
; Title:        baseResponse.ts
; Author:       David Rachwalik
; Date:         2022/09/02
; Description:  Model for baseline responses
;===========================================
*/

const fs = require('fs');

// Parse data from file
function readJsonFile(filepath, encoding = 'utf8') {
  const file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

// Gather data from configuration
function getResponseConfig() {
  const filepath = `${__dirname}/message.json`;
  return readJsonFile(filepath);
}

function baseResponse(httpCode, message, data, noLog = false) {
  // https://www.w3schools.com/jsref/jsref_obj_date.asp
  const timestamp = new Date().toLocaleString();

  const response = {
    httpCode,
    message,
    data,
    timestamp,
  };
  if (!noLog) {
    console.log(response); // log responses by default
  }
  return response;
}

function logResponse(httpCode, data) {
  // Grab message from response config
  const config = getResponseConfig();
  const match = config.find((c) => c.statusCode === String(httpCode));
  const message = match ? match.message : '';
  // Feed values into baseline response
  return baseResponse(httpCode, message, data);
}

module.exports = logResponse;

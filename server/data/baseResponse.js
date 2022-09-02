/*
============================================
; Title:        baseResponse.ts
; Author:       David Rachwalik
; Date:         2022/08/31
; Description:  Model for baseline responses
;===========================================
*/
/* eslint-disable @typescript-eslint/no-explicit-any */

// interface IBaseResponse {
//   httpCode: string | number;
//   message: string;
//   data: any;
//   timestamp: string;
// }

// export function baseResponse(
//   httpCode: string | number,
//   message: string,
//   data: any,
//   noLog = false,
// ): IBaseResponse {
//   // timestamp: new Date().toLocaleDateString(),
//   const timestamp = new Date().toLocaleTimeString();

//   const response: IBaseResponse = {
//     httpCode,
//     message,
//     data,
//     timestamp,
//   };
//   if (!noLog) {
//     console.log(response);
//   }

//   return response;
// }

const fs = require('fs');

function readJsonFileSync(filepath, encoding = 'utf8') {
  // const _encoding = typeof encoding !== 'undefined' ? encoding : 'utf8';
  const file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

function getResponseConfig() {
  // const configPath = './message.json';
  const filepath = `${__dirname}/message.json`;
  return readJsonFileSync(filepath);
}

function baseResponse(httpCode, message, data, noLog = false) {
  // https://www.w3schools.com/jsref/jsref_obj_date.asp
  // const timestamp = new Date().toLocaleDateString();
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
  const config = getResponseConfig();
  const match = config.find((c) => c.statusCode === String(httpCode));
  const message = match ? match.message : '';
  return baseResponse(httpCode, message, data);
}

module.exports = logResponse;

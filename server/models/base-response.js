/*
============================================
; Title:        base-response.js
; Author:       David Rachwalik
; Date:         2022/08/29
; Description:  Model for baseline responses
;===========================================
*/

class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      // timestamp: new Date().toLocaleDateString(),
      timestamp: new Date().toLocaleTimeString(),
    };
  }
}

module.exports = BaseResponse;

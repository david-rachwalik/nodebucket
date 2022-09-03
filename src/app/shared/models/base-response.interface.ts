/*
============================================
; Title:        base-response.interface.ts
; Author:       David Rachwalik
; Date:         2022/08/31
; Description:  Interface for baseline response
;===========================================
*/

// export interface BaseResponse {
//   httpCode: number;
//   message: string;
//   data: any;
//   timestamp: string;
// }

export interface BaseResponse<T> {
  httpCode: number | string;
  message: string;
  data: T;
  timestamp: string;
}

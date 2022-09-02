/*
============================================
; Title:        employee.interface.ts
; Author:       David Rachwalik
; Date:         2022/08/17
; Description:  Interface for Employee documents
;===========================================
*/

import { Item } from './item.interface';

export interface Employee {
  empId: number;
  firstName: string;
  lastName: string;
  todo: Item[];
  done: Item[];
}

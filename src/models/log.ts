import { Customer } from "./customer";
import { Machine } from "./machine";
import { Operator } from "./operator";

interface LogDetail {
  ID: number;
  LogID: number;
  RecordTypeID: number;
  RecordSubTypeID: number;
  RecordDetailID: number;
}

export interface Log {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  type: string;
  machine_id: number;
  machine: Machine;
  operator_id: number;
  operator: Operator;
  shift: number;
  work_order: string;
  client_id: number;
  client: Customer;
  log_detail: LogDetail; // Tipo de log_detail desconocido, puedes cambiarlo a un tipo adecuado si es necesario
}
import { HttpExceptionResponse } from "./httpExceptionResponse.interface";

export interface CustomHttpExceptionResponse
  extends HttpExceptionResponse {
  path: string;
  method: string;
  message: string;
  validationMessages: string[];
  timeStamp: Date;
}

import {Application, NextFunction, Request, Response} from 'express'
import * as http from 'http'

export class ErrorHandler extends Error {
  status: number
  message: string

  constructor(status?: number, message?: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.status = status || 500
    this.name = 'ErrorHandler'
    this.message = message || http.STATUS_CODES[this.status] || 'Error'
  }
}

export const initErrorHandler = (app: Application) => {
  app.use((error: Error, req: Request, res: CustomResponse, next: NextFunction) => {
    if (typeof error === 'number') {
      error = new ErrorHandler(error)
    }

    if (error.name === "ErrorHandler") {
      res.sendError(error)
    } else {
      error = new ErrorHandler(500, error.message)
      res.sendError(error)
    }
  })
}

export interface CustomResponse extends Response {
  sendError: (error: ErrorHandler | Error, message?: string) => void;
}

export const sendErrorModule = (req: Request, res: CustomResponse, next: NextFunction): void => {
  res.sendError = (error: ErrorHandler): void => {
    const {status , message} = error
    res.status(status)
    res.json({message})
  }

  next()
}
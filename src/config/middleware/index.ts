import {Application} from 'express'
import * as cors from "cors"
import * as bodyParser from 'body-parser'
import {sendErrorModule} from 'src/config/error'

export const applyMiddleware = (app: Application) => {
  app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf
    }
  }))

  app.use(cors())

  app.use(sendErrorModule)
}
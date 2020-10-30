import * as Mongoose from 'mongoose'
import Logger from 'src/utils/Logger'

let dbConnection: Mongoose.Connection

export const connectToDB = () => {
  if (dbConnection) {
    return
  }

  Mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(mon => {
      dbConnection = mon.connection
      Logger.info('[DB] Successfully connected!')
    }).then(() => {
    dbConnection.on('error', err => Logger.error(`[DB] connection ${err}`))
    dbConnection.on('reconnected', () => Logger.warn('[DB] reconnected'))
    dbConnection.on('disconnected', () => Logger.warn('[DB] disconnected'))
  })
    .catch(e => Logger.error(`[DB] Error: ${e}`,))
}


export const disconnectDB = () => dbConnection && Mongoose.disconnect()
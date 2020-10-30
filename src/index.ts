import * as express from 'express'
import {connectToDB} from 'src/database'
import {createFilm, getAllFilms, getFilm} from 'src/components/Film'
import {applyMiddleware} from 'src/config/middleware'
import {initErrorHandler} from 'src/config/error'

const {PORT} = process.env
const app = express()

applyMiddleware(app)
connectToDB()

app.get('/films', getAllFilms)
app.get('/films/:id', getFilm)
app.post('/films', createFilm)

initErrorHandler(app)

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT)
})
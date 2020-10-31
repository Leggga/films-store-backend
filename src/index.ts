import * as express from 'express'
import {connectToDB} from 'src/database'
import {createFilm, deleteFilm, getAllFilms, getFilm, uploadFile} from 'src/components/Film'
import {applyMiddleware} from 'src/config/middleware'
import {initErrorHandler} from 'src/config/error'

import * as multer from 'multer'

const upload = multer({dest: 'uploads/'})

const {PORT} = process.env
const app = express()

applyMiddleware(app)
connectToDB()

app.get('/films', getAllFilms)
app.get('/films/:id', getFilm)
app.post('/films', createFilm)
app.delete('/films/:id', deleteFilm)
app.post('/upload', upload.single('file'), uploadFile)

initErrorHandler(app)

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT)
})
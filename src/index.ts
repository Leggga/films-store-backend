import * as express from 'express'
import * as multer from 'multer'

import {connectToDB} from 'src/database'
import {createFilm, deleteFilm, getAllFilms, getFilm, uploadFile} from 'src/components/Film'
import {applyMiddleware} from 'src/config/middleware'
import {initErrorHandler} from 'src/config/error'

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, callback) => {
    file.mimetype === 'text/plain' ? callback(null, true) : callback(new Error("Accepts only text file!"))
  }
})

const {PORT} = process.env
const app = express()
const apiRoute = express.Router()

applyMiddleware(app)
connectToDB()

apiRoute.get('/films', getAllFilms)
apiRoute.get('/films/:id', getFilm)
apiRoute.post('/films', createFilm)
apiRoute.delete('/films/:id', deleteFilm)
apiRoute.post('/upload', upload.single('file'), uploadFile)

app.use('/api', apiRoute)
initErrorHandler(app)

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT)
})

//TODO add types for JOI
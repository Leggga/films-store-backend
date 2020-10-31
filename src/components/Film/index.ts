import {NextFunction, Request, Response} from 'express'
import FilmService from 'src/components/Film/service'
import {ErrorHandler} from 'src/config/error'
import * as fs from 'fs'
import * as readline from 'readline'
import {ResponseMessage} from 'src/types'
import {IFilm} from 'src/database/films/films.types'


export async function getAllFilms(req: Request, res: Response, next: NextFunction) {
  try {
    const films = await FilmService.findAll()
    res.status(200).json(films)
  } catch (e) {
    next(new ErrorHandler(e.status, e.message))
  }
}

export async function getFilm(req: Request, res: Response, next: NextFunction) {
  try {
    const films = await FilmService.findOneById(req.params.id)
    res.status(200).json(films)
  } catch (e) {
    next(new ErrorHandler(e.status, e.message))
  }
}

export async function createFilm(req: Request, res: Response, next: NextFunction) {
  try {
    const film = await FilmService.insert(req.body)
    res.status(201).json(film)
  } catch (e) {
    next(new ErrorHandler(e.status, e.message))
  }
}

export async function deleteFilm(req: Request, res: Response, next: NextFunction) {
  try {
    await FilmService.removeById(req.params.id)
    res.status(200).json({})
  } catch (e) {
    next(new ErrorHandler(e.status, e.message))
  }
}

export async function uploadFile(req: Request, res: Response, next: NextFunction) {
  try {
    const array = await readTextFile<IFilm>(req.file.path, objectMap)
    await FilmService.insertAll(array, true)

    res.status(200).json({message: 'File successfully imported'} as ResponseMessage)
  } catch (e) {
    next(new ErrorHandler(e?.status, e?.message))
  }
}

function readTextFile<Model>(filePath: string, mapper: Mapper<Model>): Promise<Model[]> {
  return new Promise(((resolve, reject) => {
    const stream = fs.createReadStream(filePath, {encoding: 'utf-8'})
    stream.on('error', reject)

    const reader = readline.createInterface({input: stream})
    const arr: Model[] = []

    let obj: Model = {} as Model
    let isFinishedObject = false

    reader.on('line', (line) => {
      if (line) {
        //split line
        let [key, value] = line.split(':', 2).map(str => str.trim())

        const mapped = mapper[key.toLowerCase()]

        if (mapped) {
          obj[mapped.name] = mapped.type ? convertToType(value, mapped.type) : value
        }
      } else {
        if (Object.keys(obj).length) {
          arr.push(obj)
          obj = {} as Model
        }
      }

      isFinishedObject = !line
    })


    reader.on('close', () => {
      if (!isFinishedObject) {
        arr.push(obj)
      }

      return resolve(arr)
    })
  }))
}

type Mapper<T> = {
  [k: string]: { name: keyof T, type?: 'number' | 'array' }
}

const objectMap: Mapper<IFilm> = {
  'title': {name: 'title'},
  'release year': {name: 'release_year', type: 'number'},
  'format': {name: 'format'},
  'stars': {name: 'stars', type: 'array'}
}

const convertToType = (val: any, type: string) => {
  switch (type) {
    case 'number':
      return +val
    case 'boolean':
      return !!val
    case 'array':
      return val.toString().split(',').map((v: string) => v.trim())
    default:
      return undefined
  }
}
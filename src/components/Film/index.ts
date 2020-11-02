import {NextFunction, Request, Response} from 'express'

import {ErrorHandler} from 'src/config/error'
import FilmService from 'src/components/Film/service'

import {ResponseMessage} from 'src/types'
import {IFilm} from 'src/database/films/films.types'
import {Mapper, readTextFile} from 'src/utils/fileReader'

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

const objectMap: Mapper<IFilm> = {
  'title': {name: 'title'},
  'release year': {name: 'release_year', type: 'number'},
  'format': {name: 'format'},
  'stars': {name: 'stars', type: 'array'}
}
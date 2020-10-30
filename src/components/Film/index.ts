import {NextFunction, Request, Response} from 'express'
import FilmService from 'src/components/Film/service'
import {ErrorHandler} from 'src/config/error'

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
    const film = await FilmService.insert(req.body)
    res.status(201).json(film)
  } catch (e) {
    next(new ErrorHandler(e.status, e.message))
  }
}
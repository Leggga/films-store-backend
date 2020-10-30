import {IFilm, IFilmDocument} from 'src/database/films/films.types'

export interface IFilmService {
  findAll(): Promise<IFilmDocument[]>

  findOneById(id: string): Promise<IFilmDocument>

  insert(body: IFilm): Promise<IFilmDocument>
}
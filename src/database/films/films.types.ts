import {Document, Model} from 'mongoose'

export const filmFormats = {'VHS': 'VHS', 'DVD': 'DVD', 'Blu-Ray': 'Blu-Ray'}
export type FilmsFormat = keyof typeof filmFormats

export interface IFilm {
  title: string,
  release_year: number,
  format: FilmsFormat,
  stars: string[],
}

export interface IFilmDocument extends IFilm, Document {
}

export interface IFilmModel extends Model<IFilmDocument> {

}
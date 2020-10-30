import {model} from 'mongoose'
import {FilmSchema} from './films.schema'
import {IFilmModel} from './films.types'


export const FilmsModel = model('films', FilmSchema) as IFilmModel
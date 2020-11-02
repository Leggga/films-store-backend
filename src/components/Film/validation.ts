import {filmFormats, IFilm} from 'src/database/films/films.types'
import * as Joi from '@hapi/joi'

const filmJoiSchema = Joi.object().keys({
  title: Joi.string().trim(),
  release_year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  format: Joi.string().valid(...Object.values(filmFormats)),
  stars: Joi.alternatives().try(Joi.array().min(1).items(Joi.string().trim().required()), Joi.string())
}).options({presence: 'required'})

const FilmValidation = {

  createFilm(filmData: IFilm): Joi.ValidationResult {
    return filmJoiSchema.validate(filmData)
  }
}


export default FilmValidation
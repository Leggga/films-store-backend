import {filmFormats, IFilm} from 'src/database/films/films.types'
import * as Joi from '@hapi/joi'

const FilmValidation = {

  createFilm(filmData: IFilm): Joi.ValidationResult {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      title: Joi.string(),
      release_year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
      format: Joi.string().valid(...Object.values(filmFormats)),
      actors: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string())
    }).options({presence: 'required'})

    return schema.validate(filmData)
  },

}


export default FilmValidation
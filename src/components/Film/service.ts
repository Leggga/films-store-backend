import * as Joi from '@hapi/joi'
import {ErrorHandler} from 'src/config/error'
//db
import {IFilm, IFilmDocument} from 'src/database/films/films.types'
import {FilmsModel} from 'src/database/films/films.model'

import {IFilmService} from 'src/components/Film/interface'
import FilmValidation from 'src/components/Film/validation'

const FilmService: IFilmService = {

  async findAll(): Promise<IFilmDocument[]> {
    return FilmsModel.find({})
  },

  async findOneById(id: string): Promise<IFilmDocument> {
    const foundedFilm = await FilmsModel.findById(id).exec()

    if (!foundedFilm) {
      throw new ErrorHandler(404, `Film with id ${id} not found`)
    }

    return foundedFilm
  },

  async insert(body): Promise<IFilmDocument> {
    const validation: Joi.ValidationResult = FilmValidation.createFilm(body)

    if (validation.error) {
      throw new Error(validation.error.message)
    }

    return await FilmsModel.create(body)
  },

  async insertAll(films: IFilm[], resetDb): Promise<void> {
    for (const film of films) {
      const validation: Joi.ValidationResult = FilmValidation.createFilm(film)

      if (validation.error) {
        throw new Error(validation.error.message)
      }
    }

    if (resetDb) {
      await FilmsModel.deleteMany({}).exec()
    }
    await FilmsModel.insertMany(films)
  },

  async removeById(_id: string) {
    return FilmsModel.deleteOne({_id})
      .then(query => {
        if (!query.deletedCount) {
          throw new Error()
        }
      })
      .catch(() => {
        throw new ErrorHandler(404, `Can't delete film with id ${_id}`)
      })
  }
}

export default FilmService
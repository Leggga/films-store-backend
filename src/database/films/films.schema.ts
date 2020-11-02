import {Schema} from 'mongoose'
import {filmFormats} from 'src/database/films/films.types'

export const FilmSchema = new Schema({
  title: {type: String, trim: true},
  release_year: {type: Number, validate: {validator: Number.isInteger, message: '{VALUE} is not an integer value'}},
  format: {type: String, enum: Object.values(filmFormats)},
  stars: [{type: String, trim: true}]
})

FilmSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret.__v;
    delete ret._id;
  },
});
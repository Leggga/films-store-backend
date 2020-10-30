import {Schema} from 'mongoose'
import {filmFormats} from 'src/database/films/films.types'

export const FilmSchema = new Schema({
  // id: {type: Number, index: true, unique: true, auto: true},
  title: {type: String},
  release_year: {type: Number, validate: {validator: Number.isInteger, message: '{VALUE} is not an integer value'}},
  format: {type: String, enum: Object.values(filmFormats)},
  actors: [{type: String}]
})

FilmSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret.__v;
    delete ret._id;
  },
});

//[TODO]add methods
import AbstractEntity from '@/entity/AbstractEntity.model'

/**
 * Class representing a single TV show.
 */
export default class TvShow extends AbstractEntity {
  constructor ({
    id,
    title = '',
    description = '',
    numberOfSeasons = 0,
    numberOfEpisodes = 0,
    yearOfCreation = '',
    isFavorite = false,
    genres = [],
    images = {}
  } = {}) {
    super()
    this.id = id
    this.title = title
    this.description = description
    this.numberOfSeasons = numberOfSeasons
    this.numberOfEpisodes = numberOfEpisodes
    this.yearOfCreation = yearOfCreation
    this.isFavorite = isFavorite
    this.genres = genres
    this.images = images
  }

  static buildFromApi (apiEntity) {
    const clone = Object.assign({}, apiEntity)
    return new TvShow({
      id: clone.id,
      title: clone.title,
      description: clone.description,
      numberOfSeasons: clone.seasons,
      numberOfEpisodes: clone.episodes,
      yearOfCreation: clone.creation,
      isFavorite: clone.isFavorite,
      genres: clone.genres,
      images: clone.images
    })
  }
  buildToApi () {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      seasons: this.numberOfSeasons,
      episodes: this.numberOfEpisodes,
      creation: this.yearOfCreation,
      isFavorite: this.isFavorite,
      genres: this.genres,
      images: this.images
    }
  }
}

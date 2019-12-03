import TvShowModel from '@/modules/tvShows/entity/tvShow.model'

export const gameOfThrones = {
  id: 1,
  title: 'Game of Thrones',
  description: 'Adaptation de la série de romans écrits par George R. R. Martin depuis 1996',
  seasons: 8,
  episodes: 73,
  creation: 2011,
  genres: ['Fantastique', 'Drame'],
  images: {
    show: 'https://pictures.betaseries.com/fonds/show/1161_1212974.jpg',
    banner: 'https://pictures.betaseries.com/fonds/banner/1161_1502049726.jpg'
  }
}
export const theWalkingDead = {
  id: 2,
  title: 'The Walking Dead',
  description: 'Le policier Rick Grimes se réveille à l\'hôpital après un long coma, le monde est alors envahi par les morts-vivants.',
  seasons: 9,
  episodes: 131,
  creation: 2010,
  genres: ['Action', 'Drame', 'Horreur'],
  images: {
    show: 'https://pictures.betaseries.com/fonds/show/1275_932040.jpg',
    banner: 'https://pictures.betaseries.com/fonds/banner/1275_1362953209.jpg'
  }
}

/**
 * Expose all same method of real API (same signature) but with fake data.
 */
export default {
  getAll () {
    const apiResponse = [gameOfThrones, theWalkingDead]
    return Promise.resolve(apiResponse).then(tvShows => tvShows.map(TvShowModel.buildFromApi))
  },
  getById (id) {
    let apiResponse = null
    if (id === 1) {
      apiResponse = gameOfThrones
    } else if (id === 2) {
      apiResponse = theWalkingDead
    }
    return Promise.resolve(apiResponse).then(TvShowModel.buildFromApi)
  },
  bookmark (id) {
    return Promise.resolve({ id })
  }
}

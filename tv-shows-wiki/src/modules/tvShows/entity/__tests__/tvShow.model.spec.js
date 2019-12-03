import TvShowModel from '../tvShow.model'

describe('TvShow entity', () => {
  describe('constructor', () => {
    it('should create an instance with default value', () => {
      const tvShow = new TvShowModel()
      expect(tvShow).toBeTruthy()
      expect(tvShow.title).toEqual('')
      expect(tvShow.description).toEqual('')
      expect(tvShow.numberOfSeasons).toEqual(0)
      expect(tvShow.numberOfEpisodes).toEqual(0)
      expect(tvShow.yearOfCreation).toEqual('')
      expect(tvShow.isFavorite).toEqual(false)
      expect(tvShow.genres).toEqual([])
      expect(tvShow.images).toEqual({})
    })
  })
  describe('buildFromApi', () => {
    it('should handle illegal argument', () => {
      expect(TvShowModel.buildFromApi()).toEqual(new TvShowModel())
      expect(TvShowModel.buildFromApi(undefined)).toEqual(new TvShowModel())
      expect(TvShowModel.buildFromApi(null)).toEqual(new TvShowModel())
      expect(TvShowModel.buildFromApi({})).toEqual(new TvShowModel())
    })
    it('should create an instance from an api entity', () => {
      // GIVEN an api entity of a show (data from backend).
      const apiEntity = {
        id: 196,
        title: 'Greys Anatomy',
        description: 'Meredith Grey, fille d\'un chirurgien tres réputé, commence son internat de première année en médecine chirurgicale dans un hôpital de Seattle. La jeune femme s\'efforce de maintenir de bonnes relations avec ses camarades internes, mais dans ce métier difficile la compétition fait rage.',
        seasons: '13',
        episodes: '292',
        creation: '2005',
        genres: ['Drama', 'Romance', 'Soap'],
        images: {
          show: 'https://pictures.betaseries.com/fonds/show/196_1391987730.jpg',
          poster: 'https://pictures.betaseries.com/fonds/poster/73762.jpg'
        }
      }
      // WHEN building it from the api.
      const tvShow = TvShowModel.buildFromApi(apiEntity)

      // THEN result should be of instance TvShow.
      expect(tvShow).toBeInstanceOf(TvShowModel)
      // AND correctly map all attributes
      expect(tvShow).toEqual({
        id: 196,
        title: 'Greys Anatomy',
        description: 'Meredith Grey, fille d\'un chirurgien tres réputé, commence son internat de première année en médecine chirurgicale dans un hôpital de Seattle. La jeune femme s\'efforce de maintenir de bonnes relations avec ses camarades internes, mais dans ce métier difficile la compétition fait rage.',
        numberOfSeasons: '13',
        numberOfEpisodes: '292',
        yearOfCreation: '2005',
        isFavorite: false,
        genres: ['Drama', 'Romance', 'Soap'],
        images: {
          show: 'https://pictures.betaseries.com/fonds/show/196_1391987730.jpg',
          poster: 'https://pictures.betaseries.com/fonds/poster/73762.jpg'
        }
      })
    })
  })
})

import TvShowApi from '@/modules/tvShows/api'
import { get, post } from '@/modules/http-client/http-client'
import { gameOfThrones, theWalkingDead } from '@/modules/tvShows/api/tv-show.mock'
import TvShow from '@/modules/tvShows/entity/tvShow.model'

jest.mock('@/modules/http-client/http-client', () => ({
  get: jest.fn(),
  post: jest.fn()
}))

describe('TvShowApi', () => {
  it('should get all TV shows', async () => {
    // Given: mocked backend returns 2 TV show.
    get.mockResolvedValueOnce([gameOfThrones, theWalkingDead])
    // When: getting all TV shows.
    const apiResults = await TvShowApi.getAll()
    // Then: endpoint to get all TV shows is called.
    expect(get).toHaveBeenCalledWith('/rest/shows')
    // And: response exists and has been mapped.
    expect(apiResults).toEqual([
      expect.objectContaining({ id: 1, numberOfSeasons: 8 }),
      expect.objectContaining({ id: 2, numberOfSeasons: 9 })
    ])
  })

  it('should get a single TV show', async () => {
    // Given: mocked backend returns a TV show.
    get.mockResolvedValueOnce(gameOfThrones)
    // When: getting a TV show by ID.
    const apiResult = await TvShowApi.getById(42)
    // Then: endpoint to get a single TV show is called.
    expect(get).toHaveBeenCalledWith('/rest/show/42')
    // And: response exists and has been mapped.
    expect(apiResult).toEqual(expect.objectContaining({
      id: 1,
      title: 'Game of Thrones',
      numberOfSeasons: 8
    }))
  })

  it('should bookmark a TV show', async () => {
    // Given: mocked backend returns success.
    post.mockResolvedValueOnce({})
    // When: bookmarking a TV show.
    const tvShow = new TvShow({ id: 12 })
    await TvShowApi.bookmark(tvShow)
    // Then: endpoint to bookmark is called.
    expect(post).toHaveBeenCalledWith('/rest/show/12/favorites', tvShow.buildToApi())
  })
})

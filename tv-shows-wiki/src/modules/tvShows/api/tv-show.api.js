import { get, post } from '@/modules/http-client/http-client'
import TvShowModel from '@/modules/tvShows/entity/tvShow.model'

/**
 * TV Show API.
 */
export default {
  /**
   * Request all TV shows.
   * @return {Promise<[]>} array of all TV shows
   */
  getAll () {
    return get('/rest/shows').then(tvShows => tvShows.map(TvShowModel.buildFromApi))
  },
  /**
   * Request a single TV show by ID.
   * @param id the identifier of the TV show.
   * @return {Promise<TvShowModel>} the requested TV show.
   */
  getById (id) {
    return get(`/rest/show/${id}`).then(TvShowModel.buildFromApi)
  },
  /**
   * Bookmark a TV show.
   * @param show the show entity to send.
   * @return {Promise<TvShowModel>} the bookmarked TV show.
   */
  bookmark (show) {
    return post(`/rest/show/${show.id}/favorites`, show.buildToApi())
  }
}

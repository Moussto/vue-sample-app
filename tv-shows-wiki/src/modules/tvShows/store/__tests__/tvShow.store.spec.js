import Vue from 'vue'
import Vuex from 'vuex'
import { actionTypes, getterTypes } from '@/modules/tvShows/store/types'

import tvShowStore, { initialState } from '@/modules/tvShows/store/tvShow.store'
import tvShowApi from '@/modules/tvShows/api'

Vue.use(Vuex)

jest.mock('@/modules/tvShows/api', () => ({
  getAll: jest.fn(),
  getById: jest.fn()
}))

describe('TV show store', () => {
  let store = null
  let tvShow1 = null
  let tvShow2 = null

  beforeEach(() => {
    tvShow1 = { id: 'tvShow1' }
    tvShow2 = { id: 'tvShow2' }
  })

  beforeEach(() => {
    store = new Vuex.Store(tvShowStore)
    store.replaceState({ ...initialState })
  })

  describe('state', () => {
    it('should have initial state ', () => {
      expect(store.state.tvShows).toEqual([])
      expect(store.state.loading).toEqual(false)
    })
  })

  describe('getters', () => {
    describe('all shows', () => {
      it('should return all TV shows if they exists', () => {
        // Given: initial store.
        expect(store.getters[getterTypes.TV_SHOWS]).toEqual([])
        // When: results in state.
        store.replaceState({ tvShows: [tvShow1, tvShow2] })
        // Then: getter returns TV shows.
        expect(store.getters[getterTypes.TV_SHOWS]).toEqual([tvShow1, tvShow2])
      })

      it('should return empty array if no TV shows', () => {
        // Given: initial store.
        expect(store.getters[getterTypes.TV_SHOWS]).toEqual([])
        // When: results is undefined for some reason.
        store.replaceState({ tvShows: undefined })
        // Then: getter returns empty array.
        expect(store.getters[getterTypes.TV_SHOWS]).toEqual([])
      })
    })
    describe('loading', () => {
      it('should return true if is loading', () => {
        // Given: nothing special.
        // When: loading state is true.
        store.replaceState({ loading: true })
        // Then: getter returns true.
        expect(store.getters[getterTypes.TV_SHOWS_LOADING]).toBe(true)
      })

      it('should return false if is not loading', () => {
        // Given: nothing special.
        // When: loading state is false.
        store.replaceState({ loading: false })
        // Then: getter returns false.
        expect(store.getters[getterTypes.TV_SHOWS_LOADING]).toBe(false)
      })
    })
    describe('error', () => {
      it('should return error if error', () => {
        // Given: error in state.
        store.replaceState({ error: 'api-error' })
        // When: getting error.
        const error = store.getters[getterTypes.TV_SHOWS_ERROR]
        // Then: getter returns error.
        expect(error).toEqual('api-error')
      })

      it('should return empty if no error', () => {
        // Given: no error in state.
        store.replaceState({ error: '' })
        // When: getting error.
        const error = store.getters[getterTypes.TV_SHOWS_ERROR]
        // Then: getter returns null.
        expect(error).toBeNull()
      })
    })
  })

  describe('actions', () => {
    describe('fetch TV shows', () => {
      it('should fetch TV shows through api', async () => {
        // Given: an API returning 2 TV shows.
        tvShowApi.getAll.mockResolvedValueOnce([tvShow1, tvShow2])
        // When: dispatching fetch action.
        await store.dispatch(actionTypes.FETCH_TV_SHOWS)
        // Then: API have been called
        expect(tvShowApi.getAll).toHaveBeenCalled()
        // And: the 2 TV shows are stored in state.
        expect(store.state.tvShows).toHaveLength(2)
      })
      it('should fetch single TV show through api and add it', async () => {
        // Given: an API returning a TV show
        tvShowApi.getAll.mockResolvedValueOnce(tvShow1)
        // When: dispatching fetch action.
        await store.dispatch(actionTypes.FETCH_SINGLE_TV_SHOW, 'tvShow1')
        // Then: API have been called
        expect(tvShowApi.getById).toHaveBeenCalledWith('tvShow1')
        // And: the TV show is added in the state.
        expect(store.state.tvShows).toHaveLength(1)
      })

      it('should store error in case of API error', async () => {
        // Given: API in error.
        tvShowApi.getAll.mockRejectedValueOnce(new Error('api-error'))
        // When: save action is dispatched.
        await store.dispatch(actionTypes.FETCH_TV_SHOWS)
        // Then: loading is set to false.
        expect(store.state.error).toEqual(new Error('api-error'))
        expect(store.state.loading).toBe(false)
      })
    })
  })
})

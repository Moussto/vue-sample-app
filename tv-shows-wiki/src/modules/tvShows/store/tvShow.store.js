import Vue from 'vue'
import Vuex from 'vuex'
import { actionTypes, getterTypes, mutationTypes } from '@/modules/tvShows/store/types'

import TvShowApi from '@/modules/tvShows/api/index'

Vue.use(Vuex)

export const initialState = {
  tvShows: [],
  loading: false,
  error: null
}

const getters = {
  [getterTypes.TV_SHOWS]: (state) => state.tvShows || [],
  [getterTypes.TV_SHOWS_LOADING]: (state) => state.loading || false,
  [getterTypes.TV_SHOWS_ERROR]: (state) => state.error || null
}

const actions = {
  async [actionTypes.FETCH_TV_SHOWS] ({ commit }) {
    commit(mutationTypes.SET_LOADING, true)
    try {
      const shows = await TvShowApi.getAll()
      commit(mutationTypes.SET_TV_SHOWS, shows)
    } catch (err) {
      // Here you could display a toast to your users.
      commit(mutationTypes.SET_ERROR, err)
    }
    commit(mutationTypes.SET_LOADING, false)
  },
  async [actionTypes.FETCH_SINGLE_TV_SHOW] ({ commit }, id) {
    commit(mutationTypes.SET_LOADING, true)
    try {
      const singleShow = await TvShowApi.getById(id)
      commit(mutationTypes.ADD_TV_SHOW, singleShow)
    } catch (err) {
      // Here you could display a toast to your users.
      commit(mutationTypes.SET_ERROR, err)
    }
    commit(mutationTypes.SET_LOADING, false)
  },
  async [actionTypes.ADD_TV_SHOW_TO_FAVORITES] ({ commit, getters }, id) {
    // set show to favorites in frontend store before sending it to backend
    commit(mutationTypes.SET_TO_FAVORITE, id)
    try {
      const show = getters[getterTypes.TV_SHOWS].find(show => show.id === Number(id))
      await TvShowApi.bookmark(show)
    } catch (err) {
      console.log(err)
      // rollback because of error
      commit(mutationTypes.REMOVE_FROM_FAVORITE, id)
      commit(mutationTypes.SET_ERROR, err)
    }
    commit(mutationTypes.SET_LOADING, false)
  },
  async [actionTypes.REMOVE_TV_SHOW_FROM_FAVORITES] ({ commit, getters }, id) {
    commit(mutationTypes.REMOVE_FROM_FAVORITE, id)
    try {
      const show = getters[getterTypes.TV_SHOWS].find(show => show.id === Number(id))
      await TvShowApi.bookmark(show)
    } catch (err) {
      console.log(err)
      // rollback because of error
      commit(mutationTypes.SET_TO_FAVORITE, id)
      commit(mutationTypes.SET_ERROR, err)
    }
    commit(mutationTypes.SET_LOADING, false)
  }
}

const mutations = {
  [mutationTypes.SET_TV_SHOWS] (state, shows) {
    state.tvShows = shows
  },
  [mutationTypes.SET_LOADING] (state, isLoading) {
    state.loading = isLoading
  },
  [mutationTypes.SET_ERROR] (state, error) {
    state.error = error
  },
  [mutationTypes.SET_TO_FAVORITE] (state, id) {
    state.tvShows.forEach(show => {
      if (show.id === Number(id)) {
        show.isFavorite = true
      }
    })
  },
  [mutationTypes.ADD_TV_SHOW] (state, singleShow) {
    const showAlreadyExists = state.tvShows.find(show => show.id === Number(singleShow.id))
    if (!showAlreadyExists) {
      state.tvShows.push(singleShow)
    }
  },
  [mutationTypes.REMOVE_FROM_FAVORITE] (state, id) {
    state.tvShows.forEach(show => {
      if (show.id === Number(id)) {
        show.isFavorite = false
      }
    })
  }
}

export default {
  state: initialState,
  getters,
  mutations,
  actions
}

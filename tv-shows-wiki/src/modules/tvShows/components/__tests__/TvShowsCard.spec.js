import Vue from 'vue'
import { mount } from '@vue/test-utils'
import i18n from '@/i18n'
import TvShowCard from '../TvShowCard.vue'
import TvShow from '@/modules/tvShows/entity/tvShow.model'

// we register VueMaterial here, otherwise the Vue instance in tests wouldn't recognize elements like <md-card/>
// we also could have stubbed those elements
import VueMaterial from 'vue-material'
Vue.use(VueMaterial)

describe('TvShowCard.vue', () => {
  let options = null
  let wrapper = null

  beforeEach(() => {
    options = {
      i18n,
      propsData: {
        tvShow: new TvShow({
          id: 1,
          title: 'OSB show',
          description: 'Description de la série OSB show...',
          yearOfCreation: '2015'
        })
      }
    }
  })

  it('should render correctly TvShowCard', () => {
    // GIVEN the mounted component
    wrapper = mount(TvShowCard, options)
    // THEN it should match snapshot
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display error message if creation year is not given', () => {
    // GIVEN a tv show with no year of creation
    options.propsData.tvShow = new TvShow({ id: 1 })
    // WHEN mounting component
    wrapper = mount(TvShowCard, options)
    // THEN it should display message instead of year
    expect(wrapper.find('.md-subhead').text()).toEqual('Date de création non renseignée')
  })
  it('should push show page route when clicking on title', () => {
    // GIVEN a mocked router
    wrapper = mount(TvShowCard, {
      ...options,
      propsData: {
        tvShow: new TvShow({ id: 42 })
      },
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    })
    // WHEN clicking on title
    wrapper.find('.show__title').trigger('click')
    // THEN router should be called with profileShow page and correct showId
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'profileShow', params: { showId: 42 } })
  })
  it('should display favorite badge if show is one', () => {
    // GIVEN a tv show that is in favorites
    options.propsData.tvShow = new TvShow({ id: 1, isFavorite: true })
    // WHEN mounting component
    wrapper = mount(TvShowCard, options)
    // THEN it should display a favorite badge
    expect(wrapper.find('.favorite-badge').exists()).toBe(true)
  })
})

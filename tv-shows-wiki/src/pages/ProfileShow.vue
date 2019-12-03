<template>
  <div class="home">
    <div class="md-app-content">
        <div class="show-full-detail-container md-elevation-11">
          <md-progress-spinner v-if="isShowLoading" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
          <TvShowDetail
            v-else
            @add-to-favorites="addToFavorites"
            @remove-from-favorites="removeFromFavorites"
            :tv-show="currentShow"
          />
        </div>
      </div>
    </div>
</template>

<script>
import { actionTypes, getterTypes } from '@/modules/tvShows/store/types'
import TvShowDetail from '@/modules/tvShows/components/TvShowDetail'
export default {
  name: 'profile-show',
  components: { TvShowDetail },
  data () {
    return {
      isShowLoading: false
    }
  },
  props: {
    showId: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    currentShow () {
      const shows = this.$store.getters[getterTypes.TV_SHOWS]
      return shows.find(show => show.id === Number(this.showId))
    },
    favoriteButtonLabel () {
      return this.$t('show-detail.favorite-button')
    }
  },
  methods: {
    addToFavorites () {
      this.$store.dispatch(actionTypes.ADD_TV_SHOW_TO_FAVORITES, this.showId)
    },
    removeFromFavorites () {
      this.$store.dispatch(actionTypes.REMOVE_TV_SHOW_FROM_FAVORITES, this.showId)
    }
  },
  async created () {
    if (!this.currentShow) {
      this.isShowLoading = true
      await this.$store.dispatch(actionTypes.FETCH_SINGLE_TV_SHOW, this.showId)
      this.isShowLoading = false
    }
  }
}
</script>
<style scoped lang="scss">
.show-full-detail-container {
  height: 700px;
  width: 80%;
}
.md-app-content {
  display: flex;
  justify-content: center;
}

</style>

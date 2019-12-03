<template>
  <md-card class="show md-elevation-4">
    <md-card-media @click="goToShowPage">
      <img class="show__poster" @click="goToShowPage" :src="tvShow.images.poster" alt="ShowImage">
    </md-card-media>

    <md-card-header>
      <div class="md-title show__title" @click="goToShowPage">{{ tvShow.title }}</div>
      <div class="md-subhead" v-if="tvShow.yearOfCreation">{{ createdInLabel }}</div>
      <div class="md-subhead" v-else>{{ $t("tv-show-card.unknown-year") }}</div>
    </md-card-header>

    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        <md-card-expand-trigger>
          <md-button class="show__expand-button">{{ $t('tv-show-card.expand')}}</md-button>
        </md-card-expand-trigger>
        <md-badge v-if="tvShow.isFavorite" class="md-square favorite-badge" :md-content="$t('tv-show-card.is-favorite')" />
      </md-card-actions>

      <md-card-expand-content>
        <md-card-content>
          <span class="show__description">{{ tvShow.description }}</span>
        </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>
<script>
import TvShow from '@/modules/tvShows/entity/tvShow.model'

export default {
  name: 'tv-show-card',
  computed: {
    createdInLabel () {
      return `${this.$t('tv-show-card.created-in')} ${this.tvShow.yearOfCreation}`
    }
  },
  methods: {
    goToShowPage () {
      this.$router.push({ name: 'profileShow', params: { showId: this.tvShow.id } })
    }
  },
  props: {
    tvShow: {
      type: TvShow,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-card {
    width: 290px;
    margin: 4px 0 25px;
    display: inline-block;
    vertical-align: top;
  }

  .show__title {
    cursor: pointer;
    &:hover {
      color: deepskyblue;
    }
  }

  .favorite-badge {
    margin-right: 20px;
  }

  .show__poster {
    cursor: pointer;
  }
</style>

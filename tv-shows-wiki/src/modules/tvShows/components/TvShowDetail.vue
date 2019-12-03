<template>
  <md-card-area class="show-detail">
    <md-card-media>
      <img :src="tvShow.images.banner" alt="Banner">
    </md-card-media>
    <md-card-header>
      <span class="md-title">{{ tvShow.title }}</span>
      <span class="md-subhead">( {{ tvShow.yearOfCreation }} )</span>
    </md-card-header>
    <div class="show-detail__content">
      <span class="show-detail__content__description">{{ tvShow.description}}</span>
      <md-button v-if="tvShow.isFavorite" @click="removeFavorite" class="md-raised md-accent show-detail__content__favorite__button">
        {{ this.$t('show-detail.remove-favorite-button') }}
      </md-button>
      <md-button v-else @click="addToFavorite" class="md-raised show-detail__content__favorite__button">
        {{ this.$t('show-detail.favorite-button') }}
      </md-button>
    </div>
  </md-card-area>
</template>
<script>
import TvShow from '@/modules/tvShows/entity/tvShow.model'

export default {
  name: 'tv-show-detail',
  props: {
    tvShow: {
      type: TvShow,
      required: true
    }
  },
  computed: {
    favoriteButtonLabel () {
      return this.$t('show-detail.favorite-button')
    }
  },
  methods: {
    addToFavorite () {
      this.$emit('add-to-favorites')
    },
    removeFavorite () {
      this.$emit('remove-from-favorites')
    }
  }
}
</script>
<style lang="scss" scoped>
  .md-title {
    font-size: 40px;
  }
  .md-subhead {
    font-size: 25px;
  }
  .show-detail__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    &__description {
      margin-top: 25px;
      font-size: 20px;
    }
    &__favorite__button {
      margin-top: 60px;
      width: 200px;
    }
  }
</style>

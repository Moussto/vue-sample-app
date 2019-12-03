<template>
  <div class="home">
    <div class="md-app-content">
      <TvShowCard
        v-for="show in allShows"
        :key="show.id"
        :tv-show="show"
      />
    </div>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from '@/modules/tvShows/store/types'
import TvShowCard from '@/modules/tvShows/components/TvShowCard'

export default {
  name: 'home',
  components: { TvShowCard },
  computed: {
    allShows () {
      return this.$store.getters[getterTypes.TV_SHOWS]
    }
  },
  async mounted () {
    await this.$store.dispatch(actionTypes.FETCH_TV_SHOWS)
  }
}
</script>
<style scoped lang="scss">

</style>

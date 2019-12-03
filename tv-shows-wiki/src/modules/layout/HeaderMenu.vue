<template>
  <md-toolbar class="md-medium">
    <span class="app-title">{{ $t('app-title') }}</span>
    <router-link to="/"><h3 class="md-title menu-link">Home</h3></router-link>
    <router-link to="/about"><h3 class="md-title menu-link">About</h3></router-link>
  </md-toolbar>
</template>

<script>
export default {
  name: 'header-menu'
}
</script>

<style lang="scss" scoped>
@import "../../styles/colors";
.menu-link {
  margin: 0 15px;
}
.app-title {
  color: $osb-darken-grey;
  font-size: 35px;
  margin: 5px 15px 5px 0;
}
</style>

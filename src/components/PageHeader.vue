<template>
  <header>
    <div class="header-title">Where in the world?</div>
    <div class="header-toggle" @click="lightMode = !lightMode">
      <v-icon v-if="!lightMode" name="moon" class="icon" />
      <v-icon v-if="lightMode" name="regular/moon" class="icon" />
      Dark Mode
    </div>
  </header>
</template>

<script>
// @flow

import { sync } from 'vuex-pathify'

export default {
  name: 'PageHeader',
  computed: {
    lightMode: sync('app/lightMode')
  }
}
</script>

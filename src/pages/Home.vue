<template>
  <div class="home">
    <country-boxes />
  </div>
</template>

<script>
// @flow

import CountryBoxes from '@/components/CountryBoxes'

export default {
  name: 'Home',
  components: {
    CountryBoxes
  }
}
</script>

<template>
  <div class="country-box">
    <div class="country-flag">
      <img :src="country.flag" :alt="country.name" />
    </div>
    <div class="country-text">
      <div class="country-name">
        {{ country.name }}
      </div>
      <div class="country-info">
        <div class="country-population">
          <span>Population:</span>
          {{ country.population }}
        </div>
        <div class="country-region">
          <span>Region:</span>
          {{ country.region }}
        </div>
        <div class="country-capital">
          <span>Capital:</span>
          {{ country.capital }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow

export default {
  name: 'CountryBox',
  props: {
    observer: {
      type: IntersectionObserver,
      default: undefined
    },
    country: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {}
      }
    }
  },

  mounted() {
    this.observer.observe(this.$el)
  }
}
</script>

<template>
  <div :class="['country-box']">
    <div v-if="!item.dataSeen" class="map-placeholder">
      <v-icon name="map-marked-alt" scale="6" />
    </div>

    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <router-link
        v-if="item.dataSeen"
        class="country-box-content"
        tag="div"
        :to="{
          name: 'SingleCountry',
          params: { countryId: item.country.alpha3Code }
        }"
      >
        <div class="country-flag">
          <img
            v-if="countryImage"
            :src="countryImage"
            :alt="item.country.name"
          />
          <div v-else class="country-loader"></div>
        </div>
        <div class="country-text">
          <div class="country-name">
            {{ item.country.name }}
          </div>
          <div class="country-info">
            <div class="country-population">
              <span>Population:</span>
              {{ new Intl.NumberFormat('en').format(item.country.population) }}
            </div>
            <div v-if="item.country.region" class="country-region">
              <span>Region:</span>
              {{ item.country.region }}
            </div>
            <div v-if="item.country.capital" class="country-capital">
              <span>Capital:</span>
              {{ item.country.capital }}
            </div>
          </div>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
// @flow

import VueLoadImage from 'vue-load-image'

export default {
  name: 'CountryBox',
  components: {
    VueLoadImage
  },
  props: {
    observer: {
      type: IntersectionObserver,
      default: undefined
    },
    item: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      countryImage: undefined
    }
  },
  watch: {
    item: {
      deep: true,
      handler(value) {
        if (value.dataSeen === true) {
          this.loadCountryImage()
        }
      }
    },
    observer() {
      if (this.observer) {
        this.observer.observe(this.$el)
      }
    }
  },
  beforeDestroy() {
    this.observer.unobserve(this.$el)
  },
  mounted() {
    if (this.observer) {
      this.observer.observe(this.$el)
    }
    if (this.item.dataSeen === true) {
      this.loadCountryImage()
    }
  },
  methods: {
    getImage(source: string) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = source
      })
    },
    async loadCountryImage() {
      const img = await this.getImage(this.item.country.flag)
      this.countryImage = img.src
    },
    goToCountry() {
      this.$router.push({
        name: 'SingleCountry',
        params: { countryId: this.item.country.alpha3Code }
      })
    }
  }
}
</script>

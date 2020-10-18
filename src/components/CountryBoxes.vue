<template>
  <div class="country-boxes">
    <template v-for="(item, key) in countries">
      <country-box
        ref="items"
        :key="key"
        :item="item"
        :data-id="key"
        :observer="observer"
      />
    </template>
  </div>
</template>

<script>
// @flow

import { sync } from 'vuex-pathify'

import _cloneDeep from 'lodash/cloneDeep'

import CountryBox from '@/components/CountryBox'

export default {
  name: 'CountryBoxes',
  directives: {},
  components: {
    CountryBox
  },
  data() {
    return {
      observer: undefined,
      countries: []
    }
  },
  computed: {
    processedCountries: sync('app/processedCountries')
  },
  watch: {
    processedCountries() {
      this.countries = _cloneDeep(this.processedCountries)
      this.observer.disconnect()
      this.observer = undefined
      this.observer = new IntersectionObserver(this.handleIntersection, {
        threshold: 0.1
      })
    }
  },
  mounted() {
    this.countries = _cloneDeep(this.processedCountries)
    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.1
    })
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    refreshData() {
      this.observer.disconnect()
      this.observer = undefined
      this.observer = new IntersectionObserver(this.handleIntersection, {
        threshold: 0.1
      })
    },
    handleIntersection(entries, observer) {
      console.log('HI')
      const countries = _cloneDeep(this.countries)
      entries.forEach(({ target, isIntersecting }) => {
        const id = target.dataset.id
        if (isIntersecting) {
          this.observer.unobserve(target)
          countries[id].dataSeen = true
        } else {
          countries[id].dataSeen = false
        }
      })

      this.countries = countries
    }
  }
}
</script>

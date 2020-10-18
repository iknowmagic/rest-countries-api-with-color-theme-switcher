<template>
  <div class="country-boxes">
    <template v-for="(item, key) in processedCountries">
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
      observer: undefined
    }
  },
  computed: {
    processedCountries: sync('app/processedCountries')
  },
  watch: {
    processedCountries() {
      this.observer.disconnect()
      this.observer = undefined
      this.observer = new IntersectionObserver(this.handleIntersection, {
        threshold: 0.1
      })
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.1
    })
    for (const item of this.$refs.items) {
      // this.observer.observe(item.$el)
    }
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    handleIntersection(entries, observer) {
      const countries = _cloneDeep(this.processedCountries)
      entries.forEach(({ target, isIntersecting }) => {
        const id = target.dataset.id
        if (isIntersecting) {
          this.observer.unobserve(target)
          countries[id].dataSeen = true
        } else {
          countries[id].dataSeen = false
        }
      })

      this.processedCountries = countries
    }
  }
}
</script>

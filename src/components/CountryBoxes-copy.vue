<template>
  <div class="country-boxes">
    <template v-for="(item, key) in processedCountries">
      <country-box
        :key="key"
        :item="item"
        :observer="observer"
        :data-key="key"
        class="observable"
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
  created() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      root: this.$el,
      threshold: 0.2
    })
  },
  methods: {
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          return
        }

        this.observer.unobserve(target)

        setTimeout(() => {
          const key = target.getAttribute('data-key')
          const countries = _cloneDeep(this.processedCountries)

          countries[key].dataSeen = true
          this.processedCountries = countries
        }, 250)
      })
    }
  }
}
</script>

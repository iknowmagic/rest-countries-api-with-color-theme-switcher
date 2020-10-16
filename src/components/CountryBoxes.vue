<template>
  <div class="country-boxes">
    <template v-for="country in countries">
      <country-box
        v-show="country.dataSeen"
        :key="country.alpha3Code"
        :country="country"
        :observer="observer"
        :data-index="country.dataIndex"
      />
    </template>
  </div>
</template>

<script>
// @flow

import api from '@/services'
import CountryBox from '@/components/CountryBox'

export default {
  name: 'CountryBoxes',
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
    // currCountryList() {
    // }
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  created() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      root: this.$el,
      threshold: 1.0
    })
  },
  mounted() {
    this.getAllCountries()
  },
  methods: {
    async getAllCountries() {
      const { data } = await api.countries.getAllCountries()
      this.countries = data.map((item, key) => {
        return {
          ...item,
          dataIndex: key,
          dataSeen: false
        }
      })
    },
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          return
        }

        this.observer.unobserve(target)

        setTimeout(() => {
          const i = target.getAttribute('data-index')
          this.countries[i].seen = true
        }, 1000)
      })
    }
  }
}
</script>

<template>
  <div :class="['home', { 'light-mode': lightMode, loading: !pageLoaded }]">
    <div v-if="!pageLoaded" class="page-loader">
      <v-icon name="map-marked-alt" scale="6" />
      <div>Loading data...</div>
    </div>
    <div v-if="pageLoaded" class="content">
      <header>
        <div class="header-title">Where in the world?</div>
        <div class="header-toggle" @click="lightMode = !lightMode">
          <v-icon v-if="!lightMode" name="moon" scale="0.7" class="icon" />
          <v-icon
            v-if="lightMode"
            name="regular/moon"
            scale="0.7"
            class="icon"
          />
          Dark Mode
        </div>
      </header>
      <div class="filters">
        <div class="input-container">
          <v-icon name="search" class="field-icon" />
          <input
            v-model="countrySearch"
            type="text"
            placeholder="Search for a country..."
          />
        </div>
      </div>
      <country-boxes />

      <scroll-top>
        <v-icon name="angle-double-up" scale="1.2" />
      </scroll-top>
    </div>
  </div>
</template>

<script>
// @flow

import { sync } from 'vuex-pathify'

import api from '@/services'

import empty from '@/helpers/empty'

import CountryBoxes from '@/components/CountryBoxes'
import ScrollTop from '@/components/ScrollTop'

export default {
  name: 'Home',
  components: {
    CountryBoxes,
    ScrollTop
  },
  data() {
    return {
      pageLoaded: false,
      countries: [],
      countrySearch: undefined
    }
  },
  computed: {
    lightMode: sync('app/lightMode'),
    processedCountries: sync('app/processedCountries')
  },
  watch: {
    countrySearch() {
      this.processCountries()
    }
  },
  mounted() {
    this.getAllCountries()
  },
  methods: {
    mapCountries(countries) {
      const countriesMap = countries.map((item, key) => {
        return [item.alpha3Code, { country: item, dataSeen: false }]
      })
      return Object.fromEntries(countriesMap)
    },
    processCountries() {
      if (empty(this.countrySearch)) {
        this.processedCountries = this.mapCountries(this.countries)
        return
      }
      const filteredCountries = this.countries.filter(item => {
        // const str = item.name.toLowerCase()
        // if (str.startsWith(this.countrySearch)) {
        //   return true
        // }
        const re = new RegExp(this.countrySearch, 'i')
        return !!item.name.match(re)
      })
      this.processedCountries = this.mapCountries(filteredCountries)
    },
    async getAllCountries() {
      this.pageLoaded = false
      const { data } = await api.countries.getAllCountries()
      this.countries = data
      this.processCountries()
      this.pageLoaded = true
    }
  }
}
</script>

<template>
  <div :class="['home', { 'light-mode': lightMode, loading: !pageLoaded }]">
    <div v-if="!pageLoaded" class="page-loader">
      <v-icon name="map-marked-alt" scale="6" />
      <div>Loading data...</div>
    </div>
    <div v-if="pageLoaded" class="content">
      <page-header />

      <filters />
      <country-boxes />

      <div v-if="empty(processedCountries) && pageLoaded" class="no-results">
        <v-icon name="map-marked-alt" />
        <div class="no-results-text">
          No results found.
          <br />
          Please try again.
        </div>
      </div>

      <scroll-top>
        <v-icon name="angle-double-up" scale="1.2" />
      </scroll-top>
    </div>
  </div>
</template>

<script>
// @flow

import { get, sync } from 'vuex-pathify'

import _map from 'lodash/map'

import api from '@/services'

import empty from '@/helpers/empty'

import CountryBoxes from '@/components/CountryBoxes'
import Filters from '@/components/Filters'
import PageHeader from '@/components/PageHeader'
import ScrollTop from '@/components/ScrollTop'

export default {
  name: 'Home',
  components: {
    CountryBoxes,
    ScrollTop,
    PageHeader,
    Filters
  },
  data() {
    return {
      pageLoaded: false,
      countries: [],
      sortedCountries: []
    }
  },
  computed: {
    lightMode: get('app/lightMode'),
    processedCountries: sync('app/processedCountries'),
    countrySearch: get('app/countrySearch'),
    selectedRegion: get('app/selectedRegion')
  },
  watch: {
    countrySearch() {
      this.processCountries()
    },
    selectedRegion() {
      this.processCountries()
    }
  },
  mounted() {
    this.getAllCountries()
  },
  methods: {
    empty,
    mapCountries(countries) {
      const countriesMap = countries.map((item, key) => {
        return [item.alpha3Code, { country: item, dataSeen: false }]
      })
      return Object.fromEntries(countriesMap)
    },
    processCountries() {
      // if (empty(this.countrySearch) && empty(this.selectedRegion)) {
      //   this.processedCountries = this.mapCountries(this.countries)
      //   return
      // }

      let filteredCountries = this.sortedCountries.filter(item => {
        // const str = item.name.toLowerCase()
        // if (str.startsWith(this.countrySearch)) {
        //   return true
        // }
        const re = new RegExp(this.countrySearch, 'i')
        return !!item.name.match(re)
      })
      if (this.selectedRegion) {
        filteredCountries = filteredCountries.filter(item => {
          return (
            item.region ===
            (this.selectedRegion === 'America'
              ? 'Americas'
              : this.selectedRegion)
          )
        })
      }
      this.processedCountries = this.mapCountries(filteredCountries)
    },
    async getAllCountries() {
      this.pageLoaded = false
      const { data } = await api.countries.getAllCountries()
      this.countries = data
      this.sortedCountries = this.countries.sort((a, b) => {
        if (a.name === b.name) return 0
        return a.name < b.name ? -1 : 1
      })
      this.processCountries()
      this.pageLoaded = true
    }
  }
}
</script>

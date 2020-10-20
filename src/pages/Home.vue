<template>
  <div :class="['home', { 'light-mode': lightMode, loading: !pageLoaded }]">
    <div v-if="!pageLoaded" class="page-loader">
      <v-icon name="map-marked-alt" scale="6" />
      <div>Loading data...</div>
    </div>
    <div v-if="pageLoaded" class="content">
      <page-header />

      <div class="filters-container">
        <div class="filters">
          <div
            :class="[
              'input-container',
              { 'input-container-selected': !!countrySearch }
            ]"
          >
            <v-icon name="search" class="field-icon" />
            <input
              v-model="tempCountrySearch"
              type="text"
              placeholder="Search for a country..."
            />
            <div
              class="close"
              @click="
                countrySearch = undefined
                tempCountrySearch = undefined
              "
            ></div>
          </div>

          <div
            :class="[
              'select-container',
              { 'select-container-open': toggleSelect },
              { 'select-container-selected': selectedRegion }
            ]"
          >
            <div class="select" @click="toggleSelect = !toggleSelect">
              {{ selectedRegion || 'Filter By Region' }}
            </div>

            <div class="caret" @click="toggleSelect = !toggleSelect"></div>
            <div
              class="close"
              @click="
                selectedRegion = undefined
                toggleSelect = false
              "
            ></div>
            <div class="select-options-container">
              <transition
                enter-active-class="animate__animated animate__slideInDown"
                leave-active-class="animate__animated animate__slideOutUp"
              >
                <div v-if="toggleSelect" class="select-options">
                  <div
                    v-for="region in regions"
                    :key="region"
                    class="select-option"
                    @click="
                      selectedRegion = region
                      toggleSelect = false
                    "
                  >
                    {{ region }}
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <country-boxes />

      <div v-if="empty(processedCountries) && pageLoaded" class="no-results">
        <v-icon name="map-marked-alt" scale="6" />
        <div>
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
import PageHeader from '@/components/PageHeader'
import ScrollTop from '@/components/ScrollTop'

export default {
  name: 'Home',
  components: {
    CountryBoxes,
    ScrollTop,
    PageHeader
  },
  data() {
    return {
      pageLoaded: false,
      countries: [],
      sortedCountries: [],
      countrySearch: undefined,
      regions: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      selectedRegion: undefined,
      toggleSelect: false,
      tempCountrySearch: undefined,
      countrySearchTimeoutId: undefined
    }
  },
  computed: {
    lightMode: get('app/lightMode'),
    processedCountries: sync('app/processedCountries')
  },
  watch: {
    countrySearch() {
      this.processCountries()
    },
    selectedRegion() {
      this.processCountries()
    },
    tempCountrySearch() {
      this.handleCountrySearch()
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
    },
    handleCountrySearch() {
      clearTimeout(this.countrySearchTimeoutId)
      this.countrySearchTimeoutId = setTimeout(() => {
        this.countrySearch = this.tempCountrySearch
      }, 800)
    }
  }
}
</script>

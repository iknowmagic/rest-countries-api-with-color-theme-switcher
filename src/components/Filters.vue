<template>
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
          title="search"
          name="search"
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
</template>

<script>
// @flow

import { sync } from 'vuex-pathify'

export default {
  name: 'Filters',
  data() {
    return {
      regions: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      toggleSelect: false,
      tempCountrySearch: undefined,
      countrySearchTimeoutId: undefined
    }
  },
  computed: {
    countrySearch: sync('app/countrySearch'),
    selectedRegion: sync('app/selectedRegion')
  },
  watch: {
    tempCountrySearch() {
      this.handleCountrySearch()
    }
  },
  methods: {
    handleCountrySearch() {
      clearTimeout(this.countrySearchTimeoutId)
      this.countrySearchTimeoutId = setTimeout(() => {
        this.countrySearch = this.tempCountrySearch
      }, 800)
    }
  }
}
</script>

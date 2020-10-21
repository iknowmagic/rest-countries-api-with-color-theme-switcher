<template>
  <div
    v-if="!pageLoaded"
    :class="[
      'single-country',
      { 'light-mode': lightMode, loading: !pageLoaded }
    ]"
  >
    <div v-if="!pageLoaded" class="page-loader">
      <v-icon name="map-marked-alt" scale="6" />
      <div>Loading data...</div>
    </div>
  </div>
  <div v-else :class="['single-country', { 'light-mode': lightMode }]">
    <page-header />
    <div class="single-country-body">
      <router-link tag="button" class="btn-back" :to="{ name: 'Home' }">
        <img
          :src="
            require(`@/assets/images/arrow-back-${
              lightMode ? 'light' : 'dark'
            }.svg`)
          "
          alt="Back to the country list"
        />
        Back
      </router-link>
      <div class="single-country-content">
        <div class="country-image">
          <img :src="countryImage" :alt="singleCountry.name" />
        </div>
        <div class="country-text">
          <div class="country-title">
            {{ singleCountry.name }}
          </div>
          <div class="country-info">
            <div :class="['country-info1']">
              <template v-for="(info, i) in countryInfo">
                <div
                  v-if="info.value"
                  :key="i"
                  :class="['country-info-line', { 'add-space': info.space }]"
                >
                  <span>{{ info.name }}:</span>
                  {{ info.value }}
                </div>
              </template>
            </div>

            <div :class="['country-info2']">
              <template v-for="(info, i) in countryInfo2">
                <div v-if="info.value" :key="i" :class="['country-info-line']">
                  <span>{{ info.name }}:</span>
                  {{ info.value }}
                </div>
              </template>
            </div>
          </div>
          <div v-if="borders && borders.length > 0" class="country-borders">
            <div class="country-borders-title">Border Countries:</div>
            <div class="country-borders-info">
              <router-link
                v-for="border in borders"
                :key="border.value"
                tag="button"
                class="btn-border"
                :to="{
                  name: 'SingleCountry',
                  params: { countryId: border.value }
                }"
              >
                {{ border.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow

import { get } from 'vuex-pathify'

import api from '@/services'

import PageHeader from '@/components/PageHeader'

export default {
  name: 'SingleCountry',
  components: {
    PageHeader
  },
  data() {
    return {
      countries: [],
      singleCountry: {},
      pageLoaded: false,
      countryImage: undefined
    }
  },
  computed: {
    lightMode: get('app/lightMode'),
    countryInfo() {
      return [
        {
          name: 'Native Name',
          value: this.singleCountry.nativeName
        },
        {
          name: 'Population',
          value: new Intl.NumberFormat('en').format(
            this.singleCountry.population
          )
        },
        {
          name: 'Region',
          value:
            this.singleCountry.region === 'Americas'
              ? 'America'
              : this.singleCountry.region
        },
        {
          name: 'Sub Region',
          value: this.singleCountry.subregion
        },
        {
          name: 'Capital',
          value: this.singleCountry.capital
        }
      ]
    },
    countryInfo2() {
      return [
        {
          name: 'Top Level Domain',
          value: this.singleCountry.topLevelDomain
            ? this.singleCountry.topLevelDomain.join(', ')
            : undefined
        },
        {
          name: 'Currencies',
          value: this.singleCountry.currencies
            ? this.singleCountry.currencies.map(item => item.name).join(', ')
            : undefined
        },
        {
          name: 'Languages',
          value: this.singleCountry.languages
            ? this.singleCountry.languages.map(item => item.name).join(', ')
            : this.singleCountry.languages
        }
      ]
    },
    borders() {
      return this.singleCountry.borders
        ? this.singleCountry.borders.map(item => {
            return {
              name: this.countriesMap[item],
              value: item
            }
          })
        : undefined
    },
    countriesMap() {
      const countries = this.countries.map(item => {
        return [item.alpha3Code, item.name]
      })
      return Object.fromEntries(countries)
    }
  },
  watch: {
    $route() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.pageLoaded = false
      const { data } = await api.countries.getSingleCountry(
        this.$route.params.countryId
      )
      const { data: countries } = await api.countries.getAllCountries()
      this.singleCountry = data
      this.countries = countries
      await this.loadCountryImage()
      this.pageLoaded = true
    },
    getImage(source: string) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = source
      })
    },
    async loadCountryImage() {
      const img = await this.getImage(this.singleCountry.flag)
      this.countryImage = img.src
    }
  }
}
</script>

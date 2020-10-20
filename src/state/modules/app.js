// @flow

import { make } from 'vuex-pathify'

export const state = {
  lightMode: true,
  pageLoaded: false,
  processedCountries: {}
}

export const getters = {
  ...make.getters(state)
}

export const mutations = {
  ...make.mutations(state)
}

export const actions = {
  ...make.actions(state)
}

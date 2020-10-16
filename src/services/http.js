import loadingProgressInterceptor from '@/services/helpers/loadingProgressInterceptor'
// import notAuthorizedInterceptor from '@/services/helpers/notAuthorizedInterceptor'

import axios from 'axios'
// import { throttleAdapterEnhancer } from 'axios-extensions'
// import cacheAdapter from './helpers/cacheAdapter'

const countryService = axios.create({
  baseURL: `https://restcountries.eu/rest/v2`,
  // withCredentials: true,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// unableToConnectInterceptor(api)

loadingProgressInterceptor(countryService)

export { countryService }

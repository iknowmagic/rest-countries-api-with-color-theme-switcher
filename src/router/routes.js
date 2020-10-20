import { loadPage } from '@/router/helpers/loadPage'

export default [
  {
    path: '/',
    component: () => loadPage('Home'),
    name: 'Home'
  },
  {
    path: '/country/:countryId',
    component: () => loadPage('SingleCountry'),
    name: 'SingleCountry'
  },
  { path: '*', component: () => loadPage('NotFound'), name: 'NotFound' }
]

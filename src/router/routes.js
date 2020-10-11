import { loadPage } from '@/router/helpers/loadPage'

export default [
  {
    path: '/',
    component: () => loadPage('Home'),
    name: 'Home'
  },
  {
    path: '/stories',
    component: () => loadPage('Stories'),
    name: 'Stories'
  },
  {
    path: '/features',
    component: () => loadPage('Features'),
    name: 'Features'
  },
  {
    path: '/pricing',
    component: () => loadPage('Pricing'),
    name: 'Pricing'
  }
  // { path: '*', component: () => loadPage('NotFound'), name: 'NotFound' }
]

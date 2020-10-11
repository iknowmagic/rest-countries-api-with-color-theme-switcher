<template>
  <div class="main-container">
    <div class="main-header">
      <div class="main-logo">
        <router-link :to="{ name: 'Home' }" @click.native="openMenu = false">
          <img src="@/assets/images/shared/desktop/logo.svg" alt="logo" />
        </router-link>
      </div>
      <div v-if="$mq === 'mobile'" class="main-nav-right">
        <div
          :class="['mobile-menu-trigger', { active: openMenu }]"
          @click="openMenu = !openMenu"
        ></div>
      </div>
      <div v-if="$mq !== 'mobile'" class="main-nav-center">
        <router-link :to="{ name: 'Stories' }" class="menu-item">
          Stories
        </router-link>
        <router-link :to="{ name: 'Features' }" class="menu-item">
          Features
        </router-link>
        <router-link :to="{ name: 'Pricing' }" class="menu-item">
          Pricing
        </router-link>
      </div>
      <div v-if="$mq !== 'mobile'" class="main-nav-right">
        <button class="button-1">Get an Invite</button>
      </div>
    </div>
    <div class="main-body">
      <router-view />
    </div>

    <div class="main-footer">
      <div class="footer-logo">
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/images/shared/desktop/logo.svg" alt="logo" />
          <div class="logo-filtered">
            <img src="@/assets/images/shared/desktop/logo.svg" alt="logo" />
          </div>
        </router-link>
      </div>
      <div class="footer-social">
        <a href="#">
          <img
            src="@/assets/images/shared/desktop/facebook.svg"
            alt="facebook"
          />
        </a>
        <a href="#">
          <img src="@/assets/images/shared/desktop/youtube.svg" alt="youtube" />
        </a>
        <a href="#">
          <img src="@/assets/images/shared/desktop/twitter.svg" alt="twitter" />
        </a>
        <a href="#">
          <img
            src="@/assets/images/shared/desktop/pinterest.svg"
            alt="pinterest"
          />
        </a>
        <a href="#">
          <img
            src="@/assets/images/shared/desktop/instagram.svg"
            alt="instagram"
          />
        </a>
      </div>
      <div class="footer-links">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Stories' }">Stories</router-link>
        <router-link :to="{ name: 'Features' }">Features</router-link>
        <router-link :to="{ name: 'Pricing' }">Pricing</router-link>
      </div>
      <div class="footer-button">
        <button class="button-4 button-arrow-start">Get an Invite</button>
      </div>
      <div class="footer-copy">Copyright 2019. All Rights Reserved.</div>
    </div>

    <mobile-menu />
  </div>
</template>

<script>
// @flow

import MobileMenu from '@/components/MobileMenu'
import { sync } from 'vuex-pathify'

export default {
  name: 'App',
  page() {
    // https://vue-meta.nuxtjs.org/guide/caveats.html#reactive-variables-in-template-functions
    const appName = this.appName
    return {
      title: '',
      titleTemplate: (titleChunk: string) => {
        return titleChunk
          ? `${titleChunk} ${appName ? ' | ' + appName : ''}`
          : appName
      }
    }
  },
  components: { MobileMenu },
  data() {
    return {
      appName: 'photosnap'
    }
  },
  computed: {
    openMenu: sync('mobileMenu/openMenu')
  }
}
</script>

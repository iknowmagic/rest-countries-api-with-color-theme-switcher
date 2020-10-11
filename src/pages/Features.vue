<template>
  <div class="features">
    <div class="intro">
      <div class="intro-image" :style="imgStyle"></div>
      <div class="intro-text">
        <h1>Features</h1>
        <div class="intro-text-description">
          We make sure all of our features are designed to be loved by every
          aspiring and even professional photograpers who wanted to share their
          stories.
        </div>
      </div>
    </div>
    <div class="bottom-info">
      <feature-box title="100% Responsive" image="responsive.svg">
        No matter which the device you’re on, our site is fully responsive and
        stories look beautiful on any screen.
      </feature-box>
      <feature-box title="No Photo Upload Limit" image="no-limit.svg">
        Our tool has no limits on uploads or bandwidth. Freely upload in bulk
        and share all of your stories in one go.
      </feature-box>
      <feature-box title="Available to Embed" image="embed.svg">
        Embed Tweets, Facebook posts, Instagram media, Vimeo or YouTube videos,
        Google Maps, and more.
      </feature-box>
      <feature-box title="Custom Domain" image="custom-domain.svg">
        With Photosnap subscriptions you can host your stories on your own
        domain. You can also remove our branding!
      </feature-box>
      <feature-box title="Bootst Your Exposure" image="boost-exposure.svg">
        Users that viewed your story or gallery can easily get notifed of new
        and featured stories with our built in mailing list.
      </feature-box>
      <feature-box title="Drag & Drop Image" image="drag-drop.svg">
        Easily drag and drop your image and get beautiful shots everytime. No
        over the top tooling to add friction to creating stories.
      </feature-box>
    </div>
    <beta-announcement />
  </div>
</template>

<script>
// @flow

import FeatureBox from '@/components/FeatureBox'
import BetaAnnouncement from '@/components/BetaAnnouncement'

export default {
  name: 'Features',
  page() {
    return {
      title: 'features'
    }
  },
  components: {
    FeatureBox,
    BetaAnnouncement
  },
  computed: {
    introImage() {
      let result
      try {
        result = require(`@/assets/images/features/${this.$mq}/hero.jpg`)
      } catch {
        result = require(`@/assets/images/features/desktop/hero.jpg`)
      }

      return result
    },
    imgStyle() {
      return {
        'background-image': `url(${this.introImage})`
      }
    }
  }
}
</script>

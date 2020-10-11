<template>
  <div class="beta-announcement" :style="imgStyle">
    <div class="beta-text">
      <h2>We're in beta. Get your invite today!</h2>
      <button class="button-4 button-arrow-start">Get an Invite</button>
    </div>
  </div>
</template>

<script>
// @flow

export default {
  name: 'BetaAnnouncement',
  computed: {
    betaImage() {
      let result
      try {
        result = require(`@/assets/images/shared/${this.$mq}/bg-beta.jpg`)
      } catch {
        result = require(`@/assets/images/shared/desktop/bg-beta.jpg`)
      }

      return result
    },
    imgStyle() {
      return {
        'background-image': `url(${this.betaImage})`
      }
    }
  }
}
</script>

<template>
  <div class="feature-box">
    <div class="feature-box-image">
      <img :src="currImage" alt="title" />
    </div>
    <div class="feature-box-text">
      <div class="feature-box-title">
        {{ title }}
      </div>
      <div class="feature-box-info">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
// @flow

export default {
  name: 'FeatureBox',
  props: {
    title: {
      type: String,
      default: undefined
    },
    image: {
      type: String,
      default: undefined
    }
  },
  computed: {
    currImage() {
      return require(`@/assets/images/features/desktop/${this.image}`)
    }
  }
}
</script>

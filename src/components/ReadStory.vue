<template>
  <div :class="['read-story', { 'has-date': !!date }]" :style="imageStyle">
    <div class="read-story-text">
      <div v-if="date" class="read-story-date">{{ date }}</div>
      <div class="read-story-title">
        {{ title }}
      </div>
      <div class="read-story-author">by {{ author }}</div>

      <div class="line"></div>

      <button class="button-4 button-wide">Read Story</button>
    </div>
  </div>
</template>

<script>
// @flow

export default {
  name: 'ReadStory',
  props: {
    title: {
      type: String,
      default: undefined
    },
    author: {
      type: String,
      default: undefined
    },
    image: {
      type: String,
      default: undefined
    },
    date: {
      type: String,
      default: undefined
    }
  },
  computed: {
    currImage() {
      let result
      try {
        result = require(`@/assets/images/stories/${this.$mq}/${this.image}`)
      } catch {
        result = require(`@/assets/images/stories/desktop/${this.image}`)
      }

      return result
    },
    imageStyle() {
      return `
      background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0.27%, rgba(0, 0, 0, 0.661222) 100%), url(${this.currImage});
      background-size: 100% 350px, 100%;
      background-position: bottom, top;
      `
    }
  }
}
</script>

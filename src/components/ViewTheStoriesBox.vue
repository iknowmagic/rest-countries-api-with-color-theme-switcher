<template>
  <div :class="['view-the-stories-box', { invert }]">
    <div class="view-the-stories-image" :style="imgStyle"></div>
    <div class="view-the-stories-text">
      <h2>
        <slot name="title" />
      </h2>
      <div class="view-the-stories-info">
        <slot name="info" />
      </div>
      <button class="button-2 button-arrow-start">View The Stories</button>
    </div>
  </div>
</template>

<script>
// @flow

// <template v-slot:image>
//           <img
//             :src="require(`@/assets/images/home/${$mq}/beautiful-stories.jpg`)"
//             alt="beautiful storie"
//           />
//         </template>

export default {
  name: 'ViewTheStoriesBox',
  props: {
    invert: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: undefined,
      required: true
    }
  },
  computed: {
    storyImage() {
      let result
      try {
        result = require(`@/assets/images/home/${this.$mq}/${this.image}`)
      } catch {
        result = require(`@/assets/images/home/desktop/${this.image}`)
      }

      return result
    },
    imgStyle() {
      return {
        'background-image': `url(${this.storyImage})`
      }
    }
  }
}
</script>

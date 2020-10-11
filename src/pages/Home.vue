<template>
  <div class="home">
    <div class="intro">
      <div class="intro-image" :style="imgStyle"></div>
      <div class="intro-text">
        <h1>Create and share your photo stories.</h1>
        <div class="intro-text-description">
          Photosnap is a platform for photographers and visual storytellers. We
          make it easy to share photos, tell stories and connect with others.
        </div>
        <button class="button-4 button-arrow-start">Get an Invite</button>
      </div>
    </div>
    <div class="view-the-stories-container">
      <view-the-stories-box image="beautiful-stories.jpg">
        <template v-slot:title>Beautiful Stories Every Time</template>
        <template v-slot:info>
          We provide design templates to ensure your stories look terrific.
          Easily add photos, text, embed maps and media from other networks.
          Then share your story with everyone.
        </template>
      </view-the-stories-box>
      <view-the-stories-box :invert="true" image="designed-for-everyone.jpg">
        <template v-slot:title>Designed for Everyone</template>
        <template v-slot:info>
          Photosnap can help you create stories that resonate with your
          audience. Our tool is designed for photographers of all levels,
          brands, businesses you name it.
        </template>
      </view-the-stories-box>
    </div>
    <div class="read-story-container">
      <read-story
        title="The Mountains"
        author="John Appleseed"
        image="mountains.jpg"
      />
      <read-story
        title="Sunset Cityscapes"
        author="Benjamin Cruz"
        image="cityscapes.jpg"
      />
      <read-story
        title="18 Days Voyage"
        author="Alexei Borodin"
        image="18-days-voyage.jpg"
      />
      <read-story
        title="Architecturals"
        author="Samantha Brooke"
        image="architecturals.jpg"
      />
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
    </div>
  </div>
</template>

<script>
// @flow

import ViewTheStoriesBox from '@/components/ViewTheStoriesBox'
import ReadStory from '@/components/ReadStory'
import FeatureBox from '@/components/FeatureBox'

export default {
  name: 'Home',
  components: {
    ViewTheStoriesBox,
    ReadStory,
    FeatureBox
  },
  computed: {
    introImage() {
      let result
      try {
        result = require(`@/assets/images/home/${this.$mq}/create-and-share.jpg`)
      } catch {
        result = require(`@/assets/images/home/desktop/create-and-share.jpg`)
      }

      return result
    },
    imgStyle() {
      return {
        'background-image': `url(${this.introImage})`
      }
    }
  },
  methods: {
    getImage(image: string) {
      let result
      try {
        result = require(`@/assets/images/stories/${this.$mq}/${image}`)
      } catch {
        result = require(`@/assets/images/stories/desktop/${image}`)
      }
      return result
    }
  }
}
</script>

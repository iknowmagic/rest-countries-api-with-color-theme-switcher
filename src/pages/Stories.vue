<template>
  <div class="stories">
    <div class="intro">
      <div class="intro-image" :style="imgStyle">
        <!-- <img
          :src="require()"
          alt="create and share"
        /> -->
      </div>
      <div class="intro-text">
        <div class="featured-date-text">Last month's featured story</div>
        <h1>Hazy Full Moon of Appalachia</h1>
        <div class="featured-author">
          <div class="featured-story-date">March 2nd 2020</div>
          <div class="featured-author-name">by John Appleseed</div>
        </div>
        <div class="intro-text-description">
          The dissected plateau area, while not actually made up of geological
          mountains, is popularly called "mountains," especially in eastern
          Kentucky and West Virginia, and while the ridges are not high, the
          terrain is extremely rugged.
        </div>
        <button class="button-4 button-arrow-start">Read the Story</button>
      </div>
    </div>
    <div class="stories-container">
      <read-story
        date="April 16th 2020"
        title="The Mountains"
        author="John Appleseed"
        image="mountains.jpg"
      />
      <read-story
        date="April 14th 2020"
        title="Sunset Cityscapes"
        author="Benjamin Cruz"
        image="cityscapes.jpg"
      />
      <read-story
        date="April 11th 2020"
        title="18 Days Voyage"
        author="Alexei Borodin"
        image="18-days-voyage.jpg"
      />
      <read-story
        date="April 9th 2020"
        title="Architecturals"
        author="Samantha Brooke"
        image="architecturals.jpg"
      />
      <read-story
        date="April 7th 2020"
        title="World Tour 2019"
        author="Timothy Wagner"
        image="world-tour.jpg"
      />
      <read-story
        date="April 3rd 2020"
        title="Unforeseen Corners"
        author="William Malcolm"
        image="unforeseen-corners.jpg"
      />
      <read-story
        date="March 29th 2020"
        title="King on Africa: Part II"
        author="Tim Hillenburg"
        image="king-on-africa.jpg"
      />
      <read-story
        date="March 21st 2020"
        title="The Trip to Nowhere"
        author="Felicia Rourke"
        image="trip-to-nowhere.jpg"
      />
      <read-story
        date="March 19th 2020"
        title="Rage of The Sea"
        author="Mohammed Abdul"
        image="rage-of-the-sea.jpg"
      />
      <read-story
        date="March 16th 2020"
        title="Running Free"
        author="Michelle"
        image="running-free.jpg"
      />
      <read-story
        date="March 11th 2020"
        title="Behind the Waves"
        author="Lamarr Wilson"
        image="behind-the-waves.jpg"
      />
      <read-story
        date="March 9th 2020"
        title="Calm Waters"
        author="Samantha Brooke"
        image="calm-waters.jpg"
      />
      <read-story
        date="March 5th 2020"
        title="The Milky Way"
        author="Benjamin Cruz"
        image="milky-way.jpg"
      />
      <read-story
        date="March 4th 2020"
        title="Night at The Dark Forest"
        author="Mohammed Abdul"
        image="dark-forest.jpg"
      />
      <read-story
        date="March 1st 2020"
        title="Somwarpet's Beauty"
        author="Michelle"
        image="somwarpet.jpg"
      />
      <read-story
        date="February 25th 2020"
        title="Land of Dreams"
        author="William Malcolm"
        image="land-of-dreams.jpg"
      />
    </div>
  </div>
</template>

<script>
// @flow

import ReadStory from '@/components/ReadStory'

export default {
  name: 'Stories',
  page() {
    return {
      title: 'stories'
    }
  },
  components: {
    ReadStory
  },
  computed: {
    introImage() {
      let result
      try {
        result = require(`@/assets/images/stories/${this.$mq}/moon-of-appalacia.jpg`)
      } catch {
        result = require(`@/assets/images/stories/desktop/moon-of-appalacia.jpg`)
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

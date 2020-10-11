<template>
  <div class="pricing">
    <div class="intro">
      <div class="intro-image" :style="imgStyle"></div>
      <div class="intro-text">
        <h1>Pricing</h1>
        <div class="intro-text-description">
          Create a your stories, Photosnap is a platform for photographers and
          visual storytellers. It’s the simple way to create and share your
          photos.
        </div>
      </div>
    </div>
    <div class="plans">
      <div class="plans-switcher">
        <toggle v-model="toggleActive" />
      </div>
      <div class="plan-boxes">
        <div class="plan-box">
          <div class="plan-title">Basic</div>
          <div class="plan-text">
            Includes basic usage of our platform. Recommended for new and
            aspiring photographers.
          </div>
          <div class="plan-price">
            {{ toggleActive ? '$190.00' : '$19.00' }}
          </div>
          <div class="plan-frequency">
            per {{ toggleActive ? 'year' : 'month' }}
          </div>
          <div class="plan-button">
            <button class="button-1">Pick Plan</button>
          </div>
        </div>

        <div class="plan-box accent">
          <div class="plan-title">Pro</div>
          <div class="plan-text">
            More advanced features available. Recommended for photography
            veterans and professionals.
          </div>
          <div class="plan-price">
            {{ toggleActive ? '$390.00' : '$39.00' }}
          </div>
          <div class="plan-frequency">
            per {{ toggleActive ? 'year' : 'month' }}
          </div>
          <div class="plan-button">
            <button class="button-3">Pick Plan</button>
          </div>
        </div>

        <div class="plan-box">
          <div class="plan-title">Business</div>
          <div class="plan-text">
            Additional features available such as more detailed metrics.
            Recommended for business owners.
          </div>
          <div class="plan-price">
            {{ toggleActive ? '$990.00' : '$99.00' }}
          </div>
          <div class="plan-frequency">
            per {{ toggleActive ? 'year' : 'month' }}
          </div>
          <div class="plan-button">
            <button class="button-1">Pick Plan</button>
          </div>
        </div>
      </div>
    </div>
    <div class="plans-features">
      <h2>Compare</h2>
      <h3>The Features</h3>
      <table>
        <thead>
          <tr>
            <th>The Features</th>
            <th v-for="(planValue, planKey) in plans" :key="planKey">
              {{ planValue }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(feature, i) in features" :key="`f-${i}`">
            <th>{{ feature.category }}</th>
            <td v-for="(plan, planKey) in feature.plans" :key="`p-${planKey}`">
              <span>{{ plans[planKey] }}</span>
              <img
                v-if="plan"
                src="@/assets/images/pricing/desktop/check.svg"
                alt="available"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <beta-announcement />
  </div>
</template>

<script>
// @flow

import Toggle from '@/components/Toggle'
import BetaAnnouncement from '@/components/BetaAnnouncement'

export default {
  name: 'Pricing',
  page() {
    return {
      title: 'pricing'
    }
  },
  components: {
    Toggle,
    BetaAnnouncement
  },
  data() {
    return {
      toggleActive: false,
      features: [
        {
          category: 'Unlimited Story Posting',
          plans: {
            basic: true,
            pro: true,
            business: true
          }
        },
        {
          category: 'Unlimited Photo Upload',
          plans: {
            basic: true,
            pro: true,
            business: true
          }
        },
        {
          category: 'Embedding Custom Content',
          plans: {
            basic: false,
            pro: true,
            business: true
          }
        },
        {
          category: 'Customize Metadata',
          plans: {
            basic: false,
            pro: true,
            business: true
          }
        },
        {
          category: 'Advanced Metrics',
          plans: {
            basic: false,
            pro: false,
            business: true
          }
        },
        {
          category: 'Photo Downloads',
          plans: {
            basic: false,
            pro: false,
            business: true
          }
        },
        {
          category: 'Search Engine Indexing',
          plans: {
            basic: false,
            pro: false,
            business: true
          }
        },
        {
          category: 'Custom Analytics',
          plans: {
            basic: false,
            pro: false,
            business: true
          }
        }
      ],
      plans: {
        basic: 'Basic',
        pro: 'Pro',
        business: 'Business'
      }
    }
  },
  computed: {
    introImage() {
      let result
      try {
        result = require(`@/assets/images/pricing/${this.$mq}/hero.jpg`)
      } catch {
        result = require(`@/assets/images/pricing/desktop/hero.jpg`)
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

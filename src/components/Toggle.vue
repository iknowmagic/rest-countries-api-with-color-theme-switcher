<template>
  <div class="toggle">
    <div :class="['switch-text', { active: !currActive }]">Monthly</div>
    <div class="switch">
      <input :id="id" v-model="currActive" type="checkbox" />
      <label :for="id"></label>
    </div>
    <div :class="['switch-text', { active: currActive }]">Yearly</div>
  </div>
</template>

<script>
// @flow

import uniqid from 'uniqid'

export default {
  name: 'Toggle',
  model: {
    prop: 'active',
    event: 'toggleChange'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: uniqid(),
      checked: false
    }
  },
  computed: {
    currActive: {
      get() {
        return this.active
      },
      set(data: Boolean) {
        this.$emit('toggleChange', data)
      }
    }
  }
}
</script>
